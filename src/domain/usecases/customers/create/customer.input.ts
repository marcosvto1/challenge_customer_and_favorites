import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class CreateCustomerInput extends Notifiable implements IUseCaseInput {
  constructor(
    public name: string,
    public email: string
  ) {
    super();
  }

  validate(): void {
    this.addNotifications([
      new Contract().requires(this.name, "name", "Nome Obrigatório")
      .requires(this.email, "email", "Email obrigatório")
      .isEmail(this.email, "email", "Email inválido")
    ])
  }
}
