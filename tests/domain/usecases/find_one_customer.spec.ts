import { mock, MockProxy } from "jest-mock-extended";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { UserCase } from "@/shared/usecases/usecase";
import { FindOneCustomerInput } from "@/domain/usecases/customers/findOne/find-one-customer.input";
import { FindOneCustomerUseCase } from "@/domain/usecases/customers/findOne/find-one-customer";


describe('Update Customer', () => {
  let customerRepository: MockProxy<ICustomerRepository>;
  let sut: UserCase;
  let customerId = 1;

  beforeAll(() => {
    customerRepository = mock();
  });

  beforeEach(() => {
    sut = new FindOneCustomerUseCase(customerRepository);
  })

  it('should return error if input data invalid',  async () => {
    const findOneInput = new FindOneCustomerInput(undefined as any);
        
    const result = await sut.execute(findOneInput);

    expect(result.success).toBeFalsy();
  })

  it('should call findOneById with correct params', async () => {
    const findOneInput = new FindOneCustomerInput(customerId);
        
    await sut.execute(findOneInput);

    expect(customerRepository.findCustomerById).toHaveBeenCalledWith(customerId)
    expect(customerRepository.findCustomerById).toHaveBeenCalledTimes(1);
  })

  it('should return false if findOneById returns undefined', async () => {
    customerRepository.findCustomerById.mockResolvedValueOnce(undefined);
    const findOneInput = new FindOneCustomerInput(customerId);
        
    const result = await sut.execute(findOneInput);

    expect(result.success).toBeFalsy();
  })

  it('should return success if findOneById perform with successfuly', async () => {
    customerRepository.findCustomerById.mockResolvedValueOnce({
      id: 1,
      name: 'any_name',
      email: 'mail@mail.com'
    });
    const findOneInput = new FindOneCustomerInput(customerId);
        
    const result = await sut.execute(findOneInput);

    expect(result.success).toBeTruthy();
  })
});