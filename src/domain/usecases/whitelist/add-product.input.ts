import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class AddProductWishlistInput extends Notifiable implements IUseCaseInput {

  constructor(
    public productId: string,
    public customerId: number
  ) {
    super();
  }

  validate(): void {
    this.addNotifications([
      new Contract().requires(this.productId, 'productId', 'O campo :productId é obrigatório')
        .requires(this.customerId, "customerId", "O parametro :customerId é obrigatório")
        .isGUID(this.productId, 'productId', 'O campo :productId é inválid')
    ])
  }
}