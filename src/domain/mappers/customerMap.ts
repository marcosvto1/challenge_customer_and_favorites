import { Customer } from "@/domain/entities/customer";
import { Email } from "@/domain/vos/email";

type ResultDto = {
  id: number;
  name: string;
  email: string;
}

export class CustomerMap {
  public static toResponse(customer: Customer) {
    return {
      id: customer.getId(),
      name: customer.getNome(),
      email: customer.getEmail().getValue()
    }
  }

  public static toEntity(dto: ResultDto) {
    return new Customer(dto.name, new Email(dto.email), dto.id)
  }
}