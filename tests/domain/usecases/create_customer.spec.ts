import { Notifiable } from '@/core';
import { Email } from '@/domain/vos/email';
import { mock } from 'jest-mock-extended'


export interface ICustomerRepository {
  existsByEmail(email: string): Promise<boolean> 
}

export class CustomerRepo implements ICustomerRepository {
  existsByEmail(email: string): Promise<boolean> {
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
  
  async execute(customerDto: { id: any, email: string}) {
    // Create VOs
    const email = new Email(customerDto.email);
    this.addNotifications([email])

    const customerAlreadyExists = await this.customerRepo.existsByEmail(customerDto.email);
    if (customerAlreadyExists) {
      this.addNotification("Customer.id", "Customer already exists")
    }

    
  }
}

describe('CreateCustomerCustomer', () => {
  let customerDto: any;

  beforeAll(() => {
    customerDto = {
      email: 'any_email@mail.com'
    }
  })

  it('should call customerRepository.exists with correct value', async () => {
    const customerRepo = mock<ICustomerRepository>();
    const sut = new CreateCustomerUserCase(customerRepo);
    await sut.execute(customerDto);

    expect(customerRepo.existsByEmail).toBeCalledWith('any_email@mail.com');
  })

  it('should return error if email is invalid', async () => {
    const customerRepo = mock<ICustomerRepository>();
    const sut = new CreateCustomerUserCase(customerRepo);
    await sut.execute({...customerDto, email: "email_invalid"});

    expect(sut.isValid()).toBeFalsy()
  })

  it('should is failed if already exists customer', async () => {
    const customerRepo = mock<ICustomerRepository>();
    customerRepo.existsByEmail.mockResolvedValueOnce(false);    
    const sut = new CreateCustomerUserCase(customerRepo);

    await sut.execute(customerDto);

    expect(sut.isValid()).toBeFalsy()

    const expected = sut.getNotifications().find(el => el.key === "Customer.id")
    expect(expected).toEqual(expected);
  });

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