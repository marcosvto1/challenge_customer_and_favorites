import { CreateCustomerController } from "@/app/controllers/create-customer"
import { DeleteCustomerController } from "@/app/controllers/delete-customer";
import { FindAllCustomerController } from "@/app/controllers/find-all-customer";
import { FindOneCustomerController } from "@/app/controllers/find-one-customer";
import { UpdateCustomerController } from "@/app/controllers/update-customer";
import { makeCreateCustomerUseCase } from "@/main/factories/usecases/create-customer";
import { makeDeleteCustomerUseCase } from "@/main/factories/usecases/delete-customer";
import { makeFindAllCustomerUseCase } from "@/main/factories/usecases/find-all-customer";
import { makeFindOneCustomerUseCase } from "@/main/factories/usecases/find-one-customer";
import { makeUpdateCustomerUseCase } from "@/main/factories/usecases/update-customer";

export const makeCustomerControllers = () => {
  return  [
    new UpdateCustomerController(makeUpdateCustomerUseCase()),
    new CreateCustomerController(makeCreateCustomerUseCase()),
    new FindOneCustomerController(makeFindOneCustomerUseCase()),
    new FindAllCustomerController(makeFindAllCustomerUseCase()),
    new DeleteCustomerController(makeDeleteCustomerUseCase())
  ]
}