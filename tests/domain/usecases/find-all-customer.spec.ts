import { mock, MockProxy } from "jest-mock-extended";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { UserCase } from "@/shared/usecases/usecase";
import { FindOneCustomerUseCase } from "@/domain/usecases/customers/findOne/find-one-customer";
import { FindAllCustomerUseCase } from "@/domain/usecases/customers/findAll/find-all-customer";
import { FindAllCustomerInput } from "@/domain/usecases/customers/findAll/find-all-customer.input";


describe('Find All Customer', () => {
  let customerRepository: MockProxy<ICustomerRepository>;
  let sut: UserCase;
  let customers = [
    {
      id: 1,
      name: "name_1",
      email: "mail1@mail.com"
    },
    {
      id: 2,
      name: "name_2",
      email: "mail2@mail.com"
    },
    {
      id: 3,
      name: "name_3",
      email: "mail3@mail.com"
    },
    {
      id: 4,
      name: "name_4",
      email: "mail4@mail.com"
    }
  ]

  beforeAll(() => {
    customerRepository = mock();
  });

  beforeEach(() => {
    sut = new FindAllCustomerUseCase(customerRepository);
  })

  it('should call findAllCustomer with correct params', async () => {
    customerRepository.findAllCustomer.mockResolvedValueOnce({
      records: customers,
      meta: {
        page: 1,
        pageSize: 2,
        totalPages: 2,
        total: 4
      }
    });
    const sut = new FindAllCustomerUseCase(customerRepository);
    const input = new FindAllCustomerInput(1, 2)

    await sut.execute(input)

    expect(customerRepository.findAllCustomer).toHaveBeenCalledWith({
      page: 1,
      pageSize: 2
    })
    expect(customerRepository.findAllCustomer).toHaveBeenCalledTimes(1)
  });

  it('should returns success if findAllCustomer returns records', async () => {
    customerRepository.findAllCustomer.mockResolvedValueOnce({
      records: customers,
      meta: {
        page: 1,
        pageSize: 2,
        totalPages: 2,
        total: 4
      }
    });
    const input = new FindAllCustomerInput(1, 4)

    const result = await sut.execute(input);

    expect(result.success).toBeTruthy();
  });
 
});