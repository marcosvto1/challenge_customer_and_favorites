import { Contract, Notifiable } from "@/core";
import { IUseCaseInput } from "@/shared/usecases/usecase";

export class FindAllCustomerInput extends Notifiable implements IUseCaseInput  {
  constructor(
    public page: number,
    public pageSize: number
  ) {
    super();
   }

  validate(): void {
    
  }
}