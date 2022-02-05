import { Notifiable, Notification } from "@/core";
import { Result } from "@/shared/results/result";
import { IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";
import { Customer } from "@/domain/entities/customer";
import { ICustomerRepository } from "@/domain/repositories/customer";
import { CreateCustomerInput } from "@/domain/usecases/customers/create/customer.input";
import { Email } from "@/domain/vos/email";
import { CustomerMap } from "@/domain/mappers/customerMap";


export class CreateCustomerUserCase extends Notifiable implements UserCase<CreateCustomerInput, IUseCaseOutput>  {
  private customerRepo: ICustomerRepository;
  constructor(
     customerRepo: ICustomerRepository
  ) {
    super();
    this.customerRepo = customerRepo;
  }
  
  async execute(customerInput: CreateCustomerInput) {
    // Valida Input Data
    customerInput.validate();
    if (!customerInput.isValid()) {
      return Result.Failed(customerInput.getNotifications());
    }

    // Verificar se já existe um email de customer que esta cadastrado
    const emailAlreadyExists = await this.customerRepo.emailExists(customerInput.email);
    if (emailAlreadyExists) {
      return Result.Failed(new Notification("email", "Este Email Já Existe"))
    }

    // Create Entity and DTO
    const email = new Email(customerInput.email);
    const customer = new Customer(customerInput.name, email);
    this.addNotifications([email, customer])
    if (!this.isValid()) {      
      return Result.Failed(this.getNotifications());
    }

    const resultSaveCustomer = await this.customerRepo.saveCustomer({
      name: customer.getNome(),
      email: customer.getEmail().getValue()
    });

    if (!resultSaveCustomer) {
      return Result.Failed(new Notification("customer", "Não foi possível salvar customer"))
    }

    const customerSaved = CustomerMap.toEntity(resultSaveCustomer);
    if (!customerSaved.isValid()) {
      return Result.Failed(customerSaved.getNotifications())
    }
    
    return Result.Ok(CustomerMap.toResponse(customerSaved));
  }
}
