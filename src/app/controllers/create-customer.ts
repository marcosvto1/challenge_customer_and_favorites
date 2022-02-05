import { CreateCustomerInput } from '@/domain/usecases/customers/create/customer.input';
import { UserCase } from '@/shared/usecases/usecase';
import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import { Response } from 'express';

@Controller('customers')
export class CreateCustomerController {
  constructor(
    private readonly useCase: UserCase
  ) {}

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const body = req.body as any;
    const createCustomerInput = new CreateCustomerInput(body.name, body.email)
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