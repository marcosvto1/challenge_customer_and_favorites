import { CreateCustomerUserCase } from "@/domain/usecases/customers/create/create-customer"
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer"
import { UserCase } from "@/shared/usecases/usecase"

export const makeCreateCustomerUseCase = (): UserCase => {
  return new CreateCustomerUserCase(makeCustomerRepository())
}