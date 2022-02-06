import { Contract } from "@/core";
import { ValueObject } from "@/shared/vos/value_object";
import * as bcrypt from 'bcrypt';

export interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject {
  private password: string;
  private hashed?: boolean = false;

  public static minLength: number = 6;

  constructor(props: IUserPasswordProps) {
    super();

    this.addNotifications([
      new Contract()
        .requires(props.value, "password", "O :password é obrigatório")
        .isGreaterThan(props.value.length, Password.minLength, "password")
    ]);

    this.password = props.value;
    this.hashed = props.hashed;
  }

  public comparePassword(plainTextPassword: string): Promise<boolean> | boolean {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.password;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.password === plainTextPassword;
    }
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public isAlreadyHashed (): boolean {
    if (this.hashed) {
      return this.hashed;
    }
    return false;
  }
}