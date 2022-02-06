import { DeleteCustomerUseCase } from "@/domain/usecases/customers/delete/delete-customer"
import { makeCustomerRepository } from "@/main/factories/repositories/create-customer"

export const makeDeleteCustomerUseCase = () => {
  return new DeleteCustomerUseCase(makeCustomerRepository())
}