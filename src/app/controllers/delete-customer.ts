import { Request, Response } from 'express';
import { ClassMiddleware, Controller, Delete } from "@overnightjs/core";

import { middleware } from "@/app/middlewares";
import { UserCase } from "@/shared/usecases/usecase";
import { DeleteCustomerInput } from '@/domain/usecases/customers/delete/delete-customer.input';

@Controller('api/customers')
@ClassMiddleware(middleware.enableAuth())
export class DeleteCustomerController {
  constructor(
    private readonly useCase: UserCase
  ) {}

  @Delete(':id')
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.useCase.execute(new DeleteCustomerInput(+id))
      if (result.success) {
        res.status(204).send();
      } else {
        res.status(400).send(result)
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).send({
          message: error.message
        });
      }  
    }
  }
}