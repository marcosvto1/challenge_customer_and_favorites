import { CreateCustomerController } from "@/app/controllers/create-customer"
import { UpdateCustomerController } from "@/app/controllers/update-customer";
import { makeCreateCustomerUseCase } from "@/main/factories/usecases/create-customer";
import { makeUpdateCustomerUseCase } from "@/main/factories/usecases/update-customer";

export const makeCustomerControllers = () => {
  return  [
    new UpdateCustomerController(makeUpdateCustomerUseCase()),
    new CreateCustomerController(makeCreateCustomerUseCase())
  ]
}