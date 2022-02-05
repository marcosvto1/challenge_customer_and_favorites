import { Customer } from "@/domain/entities/customer";

export class CustomerMap {
  public static toResponse(customer: Customer) {
    return {
      id: customer.getId(),
      name: customer.getNome(),
      email: customer.getEmail().getValue()
    }
  }
}