import { FindAllCustomerUseCase } from "@/domain/usecases/customers/findAll/find-all-customer";
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer";
import { UserCase } from "@/shared/usecases/usecase";

export const makeFindAllCustomerUseCase = (): UserCase => {
  return new FindAllCustomerUseCase(makeCustomerRepository())
}