import { Contract } from "@/core";
import { Email } from "@/domain/vos/email";
import { Password } from "@/domain/vos/password";
import { Entity } from "@/shared/entities/entity";

export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class User extends Entity {

  constructor(
    private _name: string,
    private _email: Email,
    private _password: Password,
    private _id: number,
  ) {
    super();
    this.addNotifications([
      _email,
      _password,
      new Contract()
        .requires(_name, "name", "O campo :name é obrigatório")
        .requires(_id, "id", "O campo :id é obrigatório")
      ])
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name
  }

  public get email(): Email {
    return this._email;
  }

  public get password(): Password {
    return this._password;
  }

}