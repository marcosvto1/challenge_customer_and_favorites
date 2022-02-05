import { Customer } from "@/domain/entities/customer";

export interface ICustomerRepository {
  emailExists(email: string): Promise<boolean>;
  saveCustomer(customer: Customer): Promise<Customer>;
  findCustomerById(id: number): Promise<Customer | undefined>;
  updateCustomer(customer: Customer): Promise<Customer>;
}