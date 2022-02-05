import { mock } from 'jest-mock-extended'
import { Customer } from '@/domain/entities/customer';
import { ICustomerRepository } from '@/domain/repositories/customer';
import { CreateCustomerUserCase } from '@/domain/usecases/customers/create/create-customer';
import { CreateCustomerInput } from '@/domain/usecases/customers/create/customer.input';
import { Email } from '@/domain/vos/email';


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

    expect(response.success).toBeFalsy();
  });

  it('should call CustomerRepository.emailExists with correct param', async () => {
    const customerRepo = mock<ICustomerRepository>();
    const sut = new CreateCustomerUserCase(customerRepo);

    await sut.execute(customerInput);

    expect(customerRepo.emailExists).toBeCalledWith(customerInput.email);
    expect(customerRepo.emailExists).toBeCalledTimes(1);
  })

  it('should return false if already exists email', async () => {
    const customerRepo = mock<ICustomerRepository>();

    customerRepo.emailExists.mockResolvedValueOnce(true);
    const sut = new CreateCustomerUserCase(customerRepo);

    const result = await sut.execute(customerInput);    
    
    expect(result.success).toBeFalsy();
  });

  it('should call saveCustomer with correct params', async () => {
    const customerRepo = mock<ICustomerRepository>();
    customerRepo.emailExists.mockResolvedValueOnce(false);
    const sut = new CreateCustomerUserCase(customerRepo);

    await sut.execute(customerInput)

    expect(customerRepo.saveCustomer).toHaveBeenCalledWith({
      name: "any_name",
      email: "email@mail.com",
    })
  })

  it('should return success and new user created', async () => {
    const customerRepo = mock<ICustomerRepository>();
    customerRepo.emailExists.mockResolvedValueOnce(false);   
    customerRepo.saveCustomer.mockResolvedValueOnce({
      name: "any_name",
      email: "mail@mail.com",
      id: 1
    });
    const sut = new CreateCustomerUserCase(customerRepo);

    const result = await sut.execute(customerInput);

    expect(result.success).toBeTruthy();
    expect(result.data).toEqual({
      "email": "mail@mail.com",
      "id": 1,
      "name": "any_name"
    })
  })
})