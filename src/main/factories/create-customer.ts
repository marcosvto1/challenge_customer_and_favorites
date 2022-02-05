import { CreateCustomerController } from "@/app/controllers/create-customer"
import { CreateCustomerUserCase } from "@/domain/usecases/customers/create/create-customer"
import { CustomerRepository } from "@/provider/database/postgree/customer/customer.repository"

export const makeCustomerController = () => {
  const customerRepo = new CustomerRepository();
  const createCustomerUseCase = new CreateCustomerUserCase(customerRepo);
  return new CreateCustomerController(createCustomerUseCase);
}