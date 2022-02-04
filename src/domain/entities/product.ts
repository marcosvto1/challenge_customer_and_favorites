import { Contract } from "@/core";
import { Entity } from "@/shared/entities/entity";

export class Product extends Entity {
  constructor(
    private readonly title: string,
    private readonly price: number,
    private readonly image: string,
    private readonly id: string,
    private readonly reviewScore: number,
  ) {
    super();

    this.addNotifications([
        new Contract().requires(title, "Product.title", "Title obrigatório")
        .requires(price, "Product.price", "Preço Obrigatório")
        .requires(id, "Product.id", "Id Obrigatório")
      ]
    );
  }
}
