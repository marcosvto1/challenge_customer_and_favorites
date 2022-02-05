import { Contract } from "@/core";
import { Product } from "@/domain/entities/product";
import { Email } from "@/domain/vos/email";
import { Entity } from "@/shared/entities/entity";

export class Customer extends Entity {

  private readonly favoritesProducts: Array<Product>;

  constructor(
    private name: string,
    private email: Email,
    private id?: number,
  ) {
    super();
    this.favoritesProducts = [];
    this.addNotifications([email, new Contract().requires(name, "Customer.name", "O Campo nome é obrigatório")])
  }

  public addFavoriteProduct(product: Product) {
    this.addNotifications([product])
    const productFound = this.favoritesProducts.find(p => p === product)
    if (productFound) {
      this.addNotification("product", "Este produt já esta cadastrado")
    }
    this.favoritesProducts.push(product)
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