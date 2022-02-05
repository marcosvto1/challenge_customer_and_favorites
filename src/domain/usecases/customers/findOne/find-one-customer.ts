import { Notifiable, Notification } from "@/core";
import { CustomerMap } from "@/domain/mappers/customerMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { FindOneCustomerInput } from "@/domain/usecases/customers/findOne/find-one-customer.input";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class FindOneCustomerUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private readonly customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    super();
    this.customerRepository = customerRepository;
  }

  async execute(input: FindOneCustomerInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications())
    }

    const resultFindCustomer = await this.customerRepository.findCustomerById(input.id);
    if (!resultFindCustomer) {
      return Result.Failed(new Notification("NotFoundCustomer", "Customer not found"))
    }

    const customer = CustomerMap.toEntity(resultFindCustomer);
    if (!customer.isValid()) {
      return Result.Failed(customer.getNotifications());
    }

    return Result.Ok(CustomerMap.toResponse(customer));
  }
}