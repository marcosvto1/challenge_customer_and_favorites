import { middleware } from "@/app/middlewares";
import { LoginUseCaseInput } from "@/domain/usecases/users/login/login.input";
import { UserCase } from "@/shared/usecases/usecase";
import { ClassMiddleware, Controller, Post } from "@overnightjs/core";
import { Request, Response } from 'express';


@Controller('api/auth')
@ClassMiddleware([middleware.enableRateLimiter()])
export class LoginController {
  constructor (
    private readonly useCase: UserCase
  ) {}

  @Post()
  async auth(req: Request, res: Response) {
    const { email , password } = req.body;
    try {
      const input = new LoginUseCaseInput(email, password);
      const { success, data, messages } = await this.useCase.execute(input);
      if (success) {
        res.status(200).json({
          accessToken: data,
        })
      } else {
        res.status(400).send({success, messages})
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