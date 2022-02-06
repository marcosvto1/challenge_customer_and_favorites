import { UserRepository } from "@/infra/database/postgree/user/user.repository"

export const makeUserRepository = () => {
  return new UserRepository();
}