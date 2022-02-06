import { GetUserByEmail, IUserRepository } from "@/domain/repositories/user";
import { User as UserPersistency } from "@/infra/database/postgree/user/user.entity";
import { getConnection } from "typeorm";

export class UserRepository implements IUserRepository {
  getUserByEmail(email: string): Promise<GetUserByEmail.Output> {
    const repository = getConnection('default').getRepository(UserPersistency);
    return repository.findOne({
      email
    });
  }
}