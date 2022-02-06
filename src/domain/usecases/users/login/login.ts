import { Notifiable, Notification } from "@/core";
import { JWTToken } from "@/domain/entities/jwt";
import { UserMap } from "@/domain/mappers/userMap";
import { IUserRepository } from "@/domain/repositories/user";
import { IAuthService } from "@/domain/services/auth-service";
import { LoginUseCaseInput } from "@/domain/usecases/users/login/login.input";
import { Result } from "@/shared/results/result";
import { IUseCaseInput, IUseCaseOutput, UserCase } from "@/shared/usecases/usecase";

export class LoginUseCase extends Notifiable implements UserCase<IUseCaseInput, IUseCaseOutput> {
  private readonly authService: IAuthService;
  private readonly userRepo: IUserRepository;

  constructor(
    authService: IAuthService,
    userRepo: IUserRepository
  ) {
    super();
    this.authService = authService;
    this.userRepo = userRepo;
  }

  async execute(input: LoginUseCaseInput) {
    input.validate();
    if (!input.isValid()) {
      return Result.Failed(input.getNotifications())
    }

    try {
      const resultGetUserByEmail = await this.userRepo.getUserByEmail(input.email);
      if (!resultGetUserByEmail) {
        return Result.Failed(new Notification("email", "o campo :email não existe"))
      }
  
      const userFounded = UserMap.toDomain(resultGetUserByEmail);
      if (!userFounded.isValid()) {
        return Result.Failed(userFounded.getNotifications());
      }
  
      const passwordValid = await userFounded.password.comparePassword(input.password)
      if (!passwordValid) {
        return Result.Failed(new Notification("password", "O campo :password nao conferem"))
      }
  
      const accessToken: JWTToken = await this.authService.signJWT({
        userId: userFounded.getId(),
        name: userFounded.name,
        email: userFounded.email.getValue()
      });
  
      return Result.Ok(accessToken)
    } catch (err) {
      console.log(err);
      return Result.Failed(new Notification("app", "Unexpected error"))
    }
   
  }
}