import { Notifiable } from "@/core";
import { Customer } from "@/domain/entities/customer";
import { CustomerMap } from "@/domain/mappers/customerMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { FindAllCustomerInput } from "@/domain/usecases/customers/findAll/find-all-customer.input";
import { Email } from "@/domain/vos/email";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class FindAllCustomerUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private readonly customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    super();
    this.customerRepository = customerRepository;
  }

  async execute(input: FindAllCustomerInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications())
    }

    const result = await this.customerRepository.findAllCustomer({
      page: input.page,
      pageSize: input.pageSize
    });

    let customers: any[] = [];
    if (result.records.length > 0) {
      for (const element of result.records) {
        const customer = new Customer(element.name, new Email(element.email), element.id);
        if (!customer.isValid()) {
          return Result.Failed(customer.getNotifications());
        }
        customers.push(CustomerMap.toResponse(customer))
      }
    }

    return Result.Ok({
      records: customers,
      meta: result.meta
    });
  }
}