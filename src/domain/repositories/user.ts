import { IUser } from "@/domain/entities/user";

export interface IUserRepository {
  getUserByEmail: (params: GetUserByEmail.email) => Promise<GetUserByEmail.Output>
}

export namespace GetUserByEmail {
  export type email = string;
  export type Output = IUser | undefined;
}
