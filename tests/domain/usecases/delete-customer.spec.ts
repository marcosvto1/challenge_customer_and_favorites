import { ICustomerRepository } from "@/domain/repositories/customer";
import { DeleteCustomerUseCase } from "@/domain/usecases/customers/delete/delete-customer";
import { DeleteCustomerInput } from "@/domain/usecases/customers/delete/delete-customer.input";
import { mock, MockProxy } from "jest-mock-extended";

describe('Delete', () => {
  let customerRepo: MockProxy<ICustomerRepository>;
  let input: DeleteCustomerInput;

  beforeAll(() => {
    customerRepo = mock();
    input = new DeleteCustomerInput(1);
    customerRepo.deleteCustomer.mockResolvedValue(true);

  })

  it('should return error if if input data failed', async () => {
    const inputInvalid = new DeleteCustomerInput(undefined as any);
    const sut = new DeleteCustomerUseCase(customerRepo);

    const result = await sut.execute(inputInvalid);

    expect(result.success).toBeFalsy();
  });

  it('should call deleteCustomer with correct params ', async() => {
    const sut = new DeleteCustomerUseCase(customerRepo);

    await sut.execute(input);

    expect(customerRepo.deleteCustomer).toHaveBeenCalledWith(1)
    expect(customerRepo.deleteCustomer).toHaveBeenCalledTimes(1)
  });
  
  it('should return error if delete customer return false', async () => {
    customerRepo.deleteCustomer.mockResolvedValueOnce(false);
    const sut = new DeleteCustomerUseCase(customerRepo);

    const result = await sut.execute(input);

    expect(result.success).toBeFalsy();
  });

  it('should return success if delete customer return true', async () => {
    const sut = new DeleteCustomerUseCase(customerRepo);

    const result = await sut.execute(input);

    expect(result.success).toBeTruthy();
    expect(result.data).toBeTruthy();
  });

  it('should return erro if deleteCustomer throws', async () => {
    customerRepo.deleteCustomer.mockRejectedValueOnce(new Error('any_error'));
    const sut = new DeleteCustomerUseCase(customerRepo);

    const result = await sut.execute(input)

    expect(result.success).toBeFalsy();
  })
});