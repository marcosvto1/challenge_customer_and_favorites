import { UpdateCustomerUseCase } from "@/domain/usecases/customers/update/update-customer"
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer"
import { UserCase } from "@/shared/usecases/usecase"

export const makeUpdateCustomerUseCase = (): UserCase => {
  return new UpdateCustomerUseCase(makeCustomerRepository())
}