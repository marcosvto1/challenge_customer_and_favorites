import { middleware } from '@/app/middlewares';
import { UpdateCustomerInput } from '@/domain/usecases/customers/update/update.input';
import { UserCase } from '@/shared/usecases/usecase';
import { ClassMiddleware, Controller, Put } from '@overnightjs/core';
import { Response, Request } from 'express';

@Controller('api/customers')
@ClassMiddleware(middleware.enableAuth())
export class UpdateCustomerController {
  constructor(
    private readonly useCase: UserCase
  ) { }

  @Put(':id')
  public async update(req: Request, res: Response): Promise<void> {
    const input = new UpdateCustomerInput(parseInt(req.params.id), req.body.name, req.body.email)
    try {
      const result = await this.useCase.execute(input);
      if (result.success) {
        res.status(200).json({
          'customer': result.data
        })
      } else {
        res.status(400).json(result)
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}