import { FindOneCustomerUseCase } from "@/domain/usecases/customers/findOne/find-one-customer";
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer";
import { UserCase } from "@/shared/usecases/usecase";

export const makeFindOneCustomerUseCase = (): UserCase => {
  return new FindOneCustomerUseCase(makeCustomerRepository())
}