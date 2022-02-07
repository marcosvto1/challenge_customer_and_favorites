import { middleware } from '@/app/middlewares';
import { FindAllCustomerInput } from '@/domain/usecases/customers/findAll/find-all-customer.input';
import { UserCase } from '@/shared/usecases/usecase';
import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Response, Request } from 'express';

@Controller('api/customers')
@ClassMiddleware(middleware.enableAuth())
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