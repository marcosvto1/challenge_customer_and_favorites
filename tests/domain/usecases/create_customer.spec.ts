import { Contract, Notifiable, Notification } from '@/core';
import { Customer } from '@/domain/entities/customer';
import { Email } from '@/domain/vos/email';
import { mock, MockProxy } from 'jest-mock-extended'

interface IUseCaseInput {
  validate(): void
}

export class CreateCustomerInput extends Notifiable implements IUseCaseInput {

  constructor(
    public name: string,
    public email: string
  ) {
    super();
  }

  validate(): void {
    this.addNotifications([
      new Contract().requires(this.name, "name", "Nome Obrigatório")
      .requires(this.email, "email", "Email obrigatório")
      .isEmail(this.email, "email", "Email inválido")
    ])
  }

}

interface IUserCaseResult {
  success: boolean
  messages: Notification[]
}

class UserCaseResult {
  public success: boolean;
  public messages: Notification[];

  public constructor(success: boolean, messages: Notification[]) {
    this.success = success;
    this.messages = messages;
  }

  public static create() {
    return new UserCaseResult(false, []);
  }

}


export interface ICustomerRepository {
  emailExists(email: string): Promise<boolean> 
}

export class CustomerRepo implements ICustomerRepository {
  emailExists(email: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
export class CreateCustomerUserCase extends Notifiable {
  private customerRepo: ICustomerRepository;
  constructor(
     customerRepo: ICustomerRepository
  ) {
    super();
    this.customerRepo = customerRepo;
  }
  
  async execute(customerInput: CreateCustomerInput): Promise<IUserCaseResult> {
    // Validate Input Data
    customerInput.validate();
    if (!customerInput.isValid()) {
      this.addNotifications([customerInput])
      return new UserCaseResult(false, customerInput.getNotifications());
    }

    // Verificar se já existe um email de customer que esta cadastrado
    const emailAlreadyExists = await this.customerRepo.emailExists(customerInput.email);
    if (!emailAlreadyExists) {
      this.addNotification("Email", "Este E-mail já está em uso");
    }

    if (this.isValid()) {
      return new UserCaseResult(false, this.getNotifications());
    }
    
    
    return new UserCaseResult(false, []);

    // const email = new Email(customerDto.email);
    // const customer = new Customer(customerDto.name, email)
    // this.addNotifications([email, customer]);

    // if (this.isValid()) {
    //   return this.getNotifications();
    // }

    // if (!email.isValid()) {
    //   return email.getNotifications();
    // }

    // const customerAlreadyExists = await this.customerRepo.existsByEmail(customerDto.email);
    // if (customerAlreadyExists) {
    //   this.addNotification("Customer.id", "Customer already exists")
    //   return this.getNotifications();
    // }

  
    // if (!customer.isValid()) {
    //   return customer.getNotifications();
    // }
    
    // /// this.customerRepo.saveCustomer(customer);

    // return new UserCaseResult(false, []);
  }
}

describe('CreateCustomerCustomer', () => {
  let customerInput: CreateCustomerInput;

  beforeAll(() => {
    customerInput = new CreateCustomerInput("any_name", "email@mail.com")
  })

  it('should return result with error when input data is invalid', async () => {
    const customerRepo = mock<ICustomerRepository>();
    const customerInputInvalid = new CreateCustomerInput("", "")
    const sut = new CreateCustomerUserCase(customerRepo);

    const response = await sut.execute(customerInputInvalid);

    expect(sut.isValid()).toBeFalsy();
    expect(response.success).toBeFalsy();
    expect(response.messages[0]).toBeInstanceOf(Notification);
  });

  it('should call CustomerRepository.emailExists with correct param', async () => {
    const customerRepo = mock<ICustomerRepository>();
    const sut = new CreateCustomerUserCase(customerRepo);

    await sut.execute(customerInput);

    expect(customerRepo.emailExists).toBeCalledWith(customerInput.email);
  })

  // it('should is failed if already exists customer', async () => {
  //   const customerRepo = mock<ICustomerRepository>();
  //   customerRepo.existsByEmail.mockResolvedValueOnce(true);    
  //   const sut = new CreateCustomerUserCase(customerRepo);

  //   await sut.execute(customerDto);

  //   const expected = sut.getNotifications().find(el => el.key === "Customer.id")
  //   expect(sut.isValid()).toBeFalsy()
  //   expect(expected).toEqual(expected);
  // });

  // it('should is failed if name is empty', async () => {
  //   const customerRepo = mock<ICustomerRepository>();
  //   customerRepo.existsByEmail.mockResolvedValueOnce(false);    
  //   const sut = new CreateCustomerUserCase(customerRepo);

  //   await sut.execute({...customerDto, name: ""})

  //   const expected = sut.getNotifications().find(el => el.key === "Customer.name")
  //   expect(sut.isValid()).toBeFalsy()
  //   expect(expected).toEqual(expected);
  // })

  // it('should call CustomerRepository.saveCustomer with correct params', async () => {
  //   const customerRepo = mock<ICustomerRepository>();
  //   customerRepo.existsByEmail.mockResolvedValueOnce(false);    
  //   const sut = new CreateCustomerUserCase(customerRepo);

  //   await sut.execute(customerDto);

  //   expect(sut.isValid()).toBeFalsy()

  //   const expected = sut.getNotifications().find(el => el.key === "Customer.id")
  //   expect(expected).toEqual(expected);
  // })
})