import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class FindOneCustomerInput extends Notifiable implements IUseCaseInput  {
  constructor(
    public id: number
  ) {
    super();
   }

  validate(): void {
    this.addNotifications([
      new Contract().requires(this.id, "id", "O id é obrigatório")
    ]);
  }
}