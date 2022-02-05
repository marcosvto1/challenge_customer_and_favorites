import { CustomerRepository } from "@/provider/database/postgree/customer/customer.repository"

export const makeCustomerRepository = () => {
  return new CustomerRepository();
}