import { Contract } from "@/core";
import { Email } from "@/domain/vos/email";
import { Entity } from "@/shared/entities/entity";

export class Customer extends Entity {
  constructor(
    private readonly name: string,
    private readonly email: Email
  ) {
    super();

    this.addNotifications([email, new Contract().requires(name, "Customer.name", "O Campo nome é obrigatório")])
  }
}