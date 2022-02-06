import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class GetProductsInput extends Notifiable implements IUseCaseInput {

  constructor(
    public customerId: number
  ) {
    super();
  }

  validate(): void {
    this.addNotifications([
      new Contract().requires(this.customerId, "customerId", "The field :customerId is required")
    ])
  }
}