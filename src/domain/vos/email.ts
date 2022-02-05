import { Contract } from "@/core/contract";
import { ValueObject } from "@/shared/vos/value_object";

export class Email extends ValueObject {
  constructor(
    private readonly address: string
  ) {
    super()

    this.addNotifications([
      new Contract()
      .requires(address, "Email", "O Campo Email é Obrigatório")
      .isEmail(address, "Email", "Email com formato inválido")
    ])
  }

  public getValue() {
    return this.address;
  }
}
