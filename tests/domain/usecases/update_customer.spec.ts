import { mock, MockProxy } from "jest-mock-extended";
import { Customer } from "@/domain/entities/customer";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { Email } from "@/domain/vos/email";
import { UserCase } from "@/shared/usecases/usecase";
import { UpdateCustomerUseCase } from "@/domain/usecases/customers/update/update-customer";
import { UpdateCustomerInput } from "@/domain/usecases/customers/update/update.input";


describe('Update Customer', () => {
  let customerRepositor: MockProxy<ICustomerRepository>;
  let sut: UserCase;

  beforeAll(() => {
    const customerSaved = {
      id: 1,
      email: "mailsaved@mail.com",
      name: "name"
    };

    const customerUpdated = {
      id: 1,
      email: "mail@mail.com",
      name: "name"
    }


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
      customerRepositor.findCustomerById.mockResolvedValueOnce({
        id: 1,
        email: "mailsaved@mail.com",
        name: "name"
      });

      new Customer("name", new Email("mailsaved@mail.com"), 1)
      const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
      
      await sut.execute(updateCustomerInput);
  
      expect(customerRepositor.emailExists).toBeCalledWith("mail@mail.com");
    })
  
    it('should return error if emailExists returns true', async () => {
      customerRepositor.findCustomerById.mockResolvedValueOnce({
        id: 1,
        email: "mailsaved@mail.com",
        name: "name"
      });

      customerRepositor.emailExists.mockResolvedValueOnce(true);

      const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
      
      const result = await sut.execute(updateCustomerInput);
  
      expect(result.success).toBeFalsy();
    });
  })

  it('should call updateCustomer with correct params', async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
    
    await sut.execute(updateCustomerInput);

    expect(customerRepositor.updateCustomer).toHaveBeenCalledWith({
      id: 1,
      name: "name",
      email: "mail@mail.com"
    });
  })

  it('should return success if updateCustomer performed with successfully', async () => {
    const updateCustomerInput = new UpdateCustomerInput(1, "name", "mail@mail.com");
    
    const result = await sut.execute(updateCustomerInput);

    expect(result.success).toBeTruthy();
  })
})