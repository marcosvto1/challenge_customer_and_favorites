import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class UpdateCustomerInput extends Notifiable implements IUseCaseInput {

  constructor (
    public id: number,
    public name: string,
    public email: string
  ) {
    super();
  }

  validate(): void {
    this.addNotifications([
      new Contract()
      .requires(this.id, "id", "O id é obrigatório")
      .requires(this.name, "name", "O campo nome é obrigatório")
      .requires(this.email, "email", "O campo Email é obrigatório")
      .isEmail(this.email, "email", "O campo Email esta com formato inválid")
    ])
  }
}
