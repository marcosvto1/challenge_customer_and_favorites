import { AddProductWishlistInput } from "@/domain/usecases/whitelist/add-product.input";
import { UserCase } from "@/shared/usecases/usecase";
import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('customers')
export class AddProductWhitelistController {
  constructor(
    private readonly useCase: UserCase
  ) {}
  @Post(':id/wishlist')
  public async addProductWhitelistController(req: Request, res: Response) {
    const { id } = req.params;
    const { productId } = req.body;
    try {
      const input = new AddProductWishlistInput(productId, +id);
      const result = await this.useCase.execute(input);
      if (result.success) {
        res.status(201).send({
          'wishlist': result.data
        });
      } 
      else {
        res.status(400).send(result)
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).send({
          message: error.message
        })
      }
    }
    
  }
}