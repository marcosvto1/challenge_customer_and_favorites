import { Customer } from "@/domain/entities/customer";

export interface ICustomerRepository {
  saveCustomer: (customer: Customer) => Customer
}