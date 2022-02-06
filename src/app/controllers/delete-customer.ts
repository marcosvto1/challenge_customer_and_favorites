import { Request, Response } from 'express';
import { ClassMiddleware, Controller, Delete } from "@overnightjs/core";

import { middleware } from "@/app/middlewares";
import { UserCase } from "@/shared/usecases/usecase";
import { DeleteCustomerInput } from '@/domain/usecases/customers/delete/delete-customer.input';

@Controller('customer')
@ClassMiddleware(middleware.enableAuth())
export class DeleteCustomer {
  constructor(
    private readonly useCase: UserCase
  ) {}

  @Delete(':id')
  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.useCase.execute(new DeleteCustomerInput(+id))
      if (result.success) {
        res.status(204);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({
          message: error.message
        });
      }  
    }
  }
}