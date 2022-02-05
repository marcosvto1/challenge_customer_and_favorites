import { Contract, Notifiable, Notification } from "@/core";
import { Customer } from "@/domain/entities/customer";
import { CustomerMap } from "@/domain/mappers/customerMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { Email } from "@/domain/vos/email";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";
import { mock, MockProxy } from "jest-mock-extended";

export class UpdateCustomerInput extends Notifiable implements IUseCaseInput {

  constructor (
    public id: number,
    public name: string,
    public email: string
  ) {
    super();
  }

  validate(): void {
    this.addNotifications([
      new Contract()
      .requires(this.id, "id", "O id é obrigatório")
      .requires(this.name, "name", "O campo nome é obrigatório")
      .requires(this.email, "email", "O campo Email é obrigatório")
      .isEmail(this.email, "email", "O campo Email esta com formato inválid")
    ])
  }
}

export class UpdateCustomerUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private readonly customerRepo: ICustomerRepository;

  constructor(customerRepo: ICustomerRepository) {
    super();
    this.customerRepo =customerRepo;
  }
  
  async execute(input: UpdateCustomerInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications())
    }

    // Get customer by Id
    const customerFound = await this.customerRepo.findCustomerById(input.id);
    if (!customerFound) {
      return Result.Failed(new Notification("id", `Custumer not found to id ${input.id}`))
    }

    let emailAlreadyExists = false;
    if (customerFound.getEmail().getValue() !== input.email) {
      emailAlreadyExists = await this.customerRepo.emailExists(input.email);
    }

    if (emailAlreadyExists === true) {
      return Result.Failed(new Notification("email", "Este Email Já Existe"))
    }
    
    customerFound.setEmailAddress(new Email(input.email))
    customerFound.setName(input.name);
    if (!customerFound.isValid()) {
      return Result.Failed(customerFound.getNotifications());
    }

    const customerUpdated = await this.customerRepo.updateCustomer(customerFound);
    console.log(customerUpdated);
    if (!customerUpdated.isValid()) {
      return Result.Failed(customerFound.getNotifications());
    }

    return Result.Ok(CustomerMap.toResponse(customerUpdated))
  }
}

describe('Update Customer', () => {
  let customerRepositor: MockProxy<ICustomerRepository>;
  let sut: UserCase;

  beforeAll(() => {
    const customerUpdated = new Customer("name", new Email("mail@mail.com"), 1);
    const customerSaved  = new Customer("name", new Email("mailsaved@mail.com"), 1);

    customerRepositor = mock();
    customerRepositor.updateCustomer.mockResolvedValue(customerUpdated);
    customerRepositor.findCustomerById.mockResolvedValue(customerSaved);
    customerRepositor.emailExists.mockResolvedValue(false);
  });

  beforeEach(() => {
    sut = new UpdateCustomerUseCase(customerRepositor);
  })

  it('should return error if input data invalid',  async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "", "");
        
    const result = await sut.execute(updateCustomerInput);

    expect(result.success).toBeFalsy();
  })

  it('should call findCustomer with correct params',  async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");

    
    await sut.execute(updateCustomerInput);

    expect(customerRepositor.findCustomerById).toHaveBeenCalledWith(1)
    expect(customerRepositor.findCustomerById).toHaveBeenCalledTimes(1)
  })

  it('should return error if findCustomer return undefined',  async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");

    customerRepositor.findCustomerById.mockResolvedValueOnce(undefined);
    
    const result = await sut.execute(updateCustomerInput);

    expect(result.success).toBeFalsy();
  })

  describe('when the input.email is different of saved', () => {
    it('should call emailExists',  async () => {
      customerRepositor.findCustomerById.mockResolvedValueOnce(new Customer("name", new Email("mailsaved@mail.com"), 1))
      const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
      
      await sut.execute(updateCustomerInput);
  
      expect(customerRepositor.emailExists).toBeCalledWith("mail@mail.com");
    })
  
    it('should return error if emailExists returns true', async () => {
      customerRepositor.findCustomerById.mockResolvedValueOnce(new Customer("name", new Email("mailsaved@mail.com"), 1))
      customerRepositor.emailExists.mockResolvedValueOnce(true);

      const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
      
      const result = await sut.execute(updateCustomerInput);
  
      expect(result.success).toBeFalsy();
    });
  })

  it('should call updateCustomer with correct params', async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
    
    await sut.execute(updateCustomerInput);

    const expectedCalledCustomer = new Customer("name", new Email("mail@mail.com"), 1)
    expect(customerRepositor.updateCustomer).toHaveBeenCalledWith(expectedCalledCustomer)
  })

  it('should return success if updateCustomer performed with successfully', async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
    
    const result = await sut.execute(updateCustomerInput);

    expect(result.success).toBeTruthy();
  })
})