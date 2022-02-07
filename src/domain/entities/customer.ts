import { Contract } from "@/core";
import { Email } from "@/domain/vos/email";
import { Entity } from "@/shared/entities/entity";

export class Customer extends Entity {

  constructor(
    private name: string,
    private email: Email,
    private id?: number,
  ) {
    super();
    this.addNotifications([email, new Contract().requires(name, "Customer.name", "O Campo nome é obrigatório")])
  }

  setId(id: number) {
    this.id = id
  }

  getId() {
    return this.id
  }

  getNome() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  setEmailAddress(email: Email) {
    this.addNotifications([email])
    if (this.email.getValue() !== email.getValue()) 
      this.email = email;
  }

  setName(name: string) {
    this.addNotifications([new Contract().requires(name, "Customer.name", "O Campo nome é obrigatório")])
    this.name = name;
  }
}