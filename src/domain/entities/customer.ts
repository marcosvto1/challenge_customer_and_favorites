import { Contract } from "@/core";
import { Product } from "@/domain/entities/product";
import { Email } from "@/domain/vos/email";
import { Entity } from "@/shared/entities/entity";

export class Customer extends Entity {

  private readonly favoritesProducts: Array<Product>;

  constructor(
    private readonly name: string,
    private readonly email: Email,
  ) {
    super();
    this.favoritesProducts = [];
    this.addNotifications([email, new Contract().requires(name, "Customer.name", "O Campo nome é obrigatório")])
  }

  public addFavoriteProduct(product: Product) {
    const productFound = this.favoritesProducts.find(p => p === product)
    if (productFound) {
      this.addNotification("product", "Este produt já esta cadastrado")
    }
    this.favoritesProducts.push(product)
  }
}