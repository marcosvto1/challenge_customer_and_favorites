import { Controller, Post, ClassMiddleware } from '@overnightjs/core';
import { Response, Request } from 'express';

import { middleware } from '@/app/middlewares';
import { CreateCustomerInput } from '@/domain/usecases/customers/create/customer.input';
import { UserCase } from '@/shared/usecases/usecase';


@Controller('customers')
@ClassMiddleware(middleware.enableAuth())
export class CreateCustomerController {
  constructor(
    private readonly useCase: UserCase
  ) {}

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const {  name, email } = req.body;
    const createCustomerInput = new CreateCustomerInput(name, email)
    try {
      const result = await this.useCase.execute(createCustomerInput);
      if (result.success) {
        res.status(201).send({
          ['customer']:  result.data
        })
      } else {
        res.status(400).send(
          result
        )
      } 
    } catch (error) {
      console.log(error)
    }
  }
}