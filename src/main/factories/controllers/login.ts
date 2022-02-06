import { LoginController } from "@/app/controllers/login-controller"
import { makeLoginUserCase } from "@/main/factories/usecases/login"

export const makeLoginController = () => {
  return new LoginController(makeLoginUserCase())
}