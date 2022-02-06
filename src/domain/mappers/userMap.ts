import { Customer } from "@/domain/entities/customer";
import { IUser, User } from "@/domain/entities/user";
import { Email } from "@/domain/vos/email";
import { Password } from "@/domain/vos/password";



export class UserMap {
  public static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue()
    }
  }

  public static toDomain(dto: IUser) {
    return new User(dto.name, new Email(dto.email), new Password({ value: dto.password, hashed: true}), dto.id,)
  }
}