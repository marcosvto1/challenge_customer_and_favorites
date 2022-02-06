import { JWTAuthService } from "@/infra/services/jwt/jwt";

export const makeJWTAuthService = () => {
  return new JWTAuthService();
}