import { middleware } from "@/app/middlewares";
import { GetProductsInput } from "@/domain/usecases/whitelist/get-products/get-products.input";
import { UserCase } from "@/shared/usecases/usecase";
import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('api/customers')
@ClassMiddleware(middleware.enableAuth())
export class GetProductInWishlistController {

  constructor(
    private readonly useCase: UserCase
  ) {}

  @Get(':id/wishlist')
  async getProductsInWishlist(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const input = new GetProductsInput(+id)
      const result = await this.useCase.execute(input);
      if (result.success) {
        res.status(200).send({
          'products': result.data
        })
      } else {
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