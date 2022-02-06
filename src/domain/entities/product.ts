import { Contract } from "@/core";
import { Entity } from "@/shared/entities/entity";

export interface IProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  reviewScore?: number;
}
export class Product extends Entity {

  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _price: number,
    private readonly _image: string,
    private readonly _reviewScore?: number,
  ) {
    super();

    this.addNotifications([
        new Contract().requires(_title, "Api.Product.title", "Title obrigatório")
        .requires(_price, "Api.Product.price", "Preço Obrigatório")
        .requires(_image, "Api.Product.image", "Image obrigatório")
        .requires(_id, "Api.Product.id", "Id Obrigatório")
      ]
    );
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get image(): string {
    return this._image;
  }

  public get price(): number {
    return this._price;
  }
  
  public get reviewScore(): number | undefined {
    return this._reviewScore;
  }
}
