import { Notifiable, Notification } from "@/core";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { DeleteCustomerInput } from "@/domain/usecases/customers/delete/delete-customer.input";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class DeleteCustomerUseCase extends Notifiable implements UserCase<IUseCaseInput,IUseCaseOutput> {
  private readonly customerRepository: ICustomerRepository;

  constructor(
    customerRepository: ICustomerRepository
  ) {
    super();
    this.customerRepository = customerRepository;
  }

  async execute(input: DeleteCustomerInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications());
    }
    try {
      const hasDeleted = await this.customerRepository.deleteCustomer(input.id);
      if (!hasDeleted) {
        return Result.Failed(new Notification("Customer", "Não foi possível remover customer"))
      }
      return Result.Ok(hasDeleted)
    } catch (err) {
      console.log(err);
      return Result.Failed(new Notification("AppError", "Unexpected error"))
    }
  }
}