import { Contract, Notifiable } from "@/core";
import { Product } from "@/domain/entities/product";

export interface IWishlist {
  id: string;
  productId: string;
  customerId: number;
}

export class Wishlist extends Notifiable implements IWishlist {
  constructor(
    private _id: string,
    private _productId: string,
    private _customerId: number,
    private _product: Product,
  ) {
    super();

    this.addNotifications([
      _product,
      new Contract().requires(_id, 'id', 'the field :id is required')
      .requires(_productId, 'id', 'the field :productId is required')
      .requires(_customerId, 'id', 'the customerId is required')
      .isGUID(_id, 'id', 'the field :id is invalid guid value')
      .isGUID(_productId, 'productId', 'the field productId is invalid guid value')
    ])
  }

  public get id(): string {
    return this._id
  }

  public get productId(): string {
    return this._productId
  }

  public get customerId(): number {
    return this._customerId;
  }

  public get product(): Product {
    return this._product;
  }
}