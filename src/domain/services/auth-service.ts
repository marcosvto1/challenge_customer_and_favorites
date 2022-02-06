import { JWTClaim, JWTToken } from "@/domain/entities/jwt";

export interface IAuthService {
  signJWT (props: JWTClaim): JWTToken;
}