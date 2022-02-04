import { mock } from 'jest-mock-extended'


export interface ICustomerRepository {
  exists(customerId: number): Promise<boolean> 
}

export class CustomerRepo implements ICustomerRepository {
  exists(customerId: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
export class CreateCustomerUserCase {
  private customerRepo: ICustomerRepository;
  constructor(
     customerRepo: ICustomerRepository
  ) {
    this.customerRepo = customerRepo;
  }
  execute(customerDto: { id: any}) {
    this.customerRepo.exists(customerDto.id);
  }
}

describe('CreateCustomerCustomer', () => {


  it('should call customerRepository.exists with correct value', async () => {
    const customerRepo = mock<ICustomerRepository>();
    const sut = new CreateCustomerUserCase(customerRepo);
    await sut.execute({ id: 'any_customer_id'});

    expect(customerRepo.exists).toBeCalledWith('any_customer_id');
  })
})