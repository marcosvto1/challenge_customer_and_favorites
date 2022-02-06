import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class LoginUseCaseInput extends Notifiable implements IUseCaseInput {
  constructor(
    public email: string,
    public password: string
  ) {
    super()
  }
  validate(): void {
    this.addNotifications([
      new Contract()
      .requires(this.email, 'email', 'O campo :email é obrigatório')
      .isEmail(this.email, 'email', "O campo :email deve ser válido")
      .requires(this.password, 'email', 'O campo :password é obrigatório')
    ])
  }
}