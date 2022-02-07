import { Notifiable, Notification } from "@/core";
import { CustomerMap } from "@/domain/mappers/customerMap";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { UpdateCustomerInput } from "@/domain/usecases/customers/update/update.input";
import { Email } from "@/domain/vos/email";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class UpdateCustomerUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private readonly customerRepo: ICustomerRepository;

  constructor(customerRepo: ICustomerRepository) {
    super();
    this.customerRepo = customerRepo;
  }
  
  async execute(input: UpdateCustomerInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications())
    }

    // Get customer by Id
    const resultFindCustomer = await this.customerRepo.findCustomerById(input.id)
    if (!resultFindCustomer) {
      return Result.Failed(new Notification("id", `Custumer not found to id ${input.id}`))
    }

    const customerFound = CustomerMap.toEntity(resultFindCustomer);
    if (!customerFound.isValid()) {
      return Result.Failed(customerFound.getNotifications());
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
    const resultUpdateCustomer = await this.customerRepo.updateCustomer({
      id: input.id,
      name: customerFound.getNome(),
      email: customerFound.getEmail().getValue()
    });

    if (!resultUpdateCustomer) {
      return Result.Failed(new Notification("id", "Falha ao atualizar"))
    }

    const customerUpdated = CustomerMap.toEntity(resultUpdateCustomer);
    if (!customerUpdated.isValid()) {
      return Result.Failed(customerFound.getNotifications());
    }

    return Result.Ok(CustomerMap.toResponse(customerUpdated))
  }
}
