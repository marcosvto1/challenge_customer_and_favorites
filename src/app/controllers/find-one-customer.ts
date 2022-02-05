import { FindOneCustomerInput } from '@/domain/usecases/customers/findOne/find-one-customer.input';
import { UserCase } from '@/shared/usecases/usecase';
import { Controller, Get, Put } from '@overnightjs/core';
import { Response, Request } from 'express';

@Controller('customers')
export class FindOneCustomerController {
  constructor(
    private readonly useCase: UserCase
  ) { }

  @Get(':id')
  public async findOne(req: Request, res: Response): Promise<void> {
    const input = new FindOneCustomerInput(parseInt(req.params.id))
    try {
      const result = await this.useCase.execute(input);
      if (result.success) {
        res.status(200).json({
          'customer': result.data
        })
      } else {
        res.status(this.getStatus(result.messages)).json(result)
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  private getStatus(messages: any) {
    let status = 400;
    const notFoundTokenErrorExists = Object.values(messages).includes("NotFoundCustomer")
    if (notFoundTokenErrorExists) {
      status = 404;
    }
    return status;
  }
}