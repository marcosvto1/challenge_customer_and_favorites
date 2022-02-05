import { FindAllCustomerInput } from '@/domain/usecases/customers/findAll/find-all-customer.input';
import { FindOneCustomerInput } from '@/domain/usecases/customers/findOne/find-one-customer.input';
import { UpdateCustomerInput } from '@/domain/usecases/customers/update/update.input';
import { UserCase } from '@/shared/usecases/usecase';
import { Controller, Get, Put } from '@overnightjs/core';
import { Response, Request } from 'express';

@Controller('customers')
export class FindAllCustomerController {
  constructor(
    private readonly useCase: UserCase
  ) { }

  @Get('')
  public async findAll(req: Request, res: Response): Promise<void> {
    const { page, pageSize } = req.query;

    const pageNumber = page ? +page : 1;
    const pageSizeValue = pageSize ? +pageSize : 1;

    const input = new FindAllCustomerInput(pageNumber, pageSizeValue)
    try {
      const result = await this.useCase.execute(input);
      if (result.success) {
        res.status(200).json({
          'customers': result.data.records,
          'meta': result.data.meta
        })
      } else {
        res.status(this.getStatus(result.messages)).json(result)
      }
    } catch (error: any) {
      console.log(error);
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