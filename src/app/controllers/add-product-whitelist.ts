import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";

@Controller('customers')
export class AddProductWhitelistController {
  @Post(':id/whitelist')
  public addProductWhitelistController(req: Request, res: Response) {
    res.send({
      message: 'add product to a whitelist'
    })
  }
}