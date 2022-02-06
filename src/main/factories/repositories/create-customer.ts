import { CustomerRepository } from "@/infra/database/postgree/customer/customer.repository"

export const makeCustomerRepository = () => {
  return new CustomerRepository();
}