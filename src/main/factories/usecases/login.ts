import { LoginUseCase } from "@/domain/usecases/users/login/login"
import { makeUserRepository } from "@/main/factories/repositories/user"
import { makeJWTAuthService } from "@/main/factories/services/jwt-auth"

export const makeLoginUserCase = () => {
  return new LoginUseCase(
    makeJWTAuthService(),
    makeUserRepository()
  );
}