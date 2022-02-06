import { JWTClaim } from "@/domain/entities/jwt";
import { IAuthService } from "@/domain/services/auth-service";
import { authConfig } from "@/main/config/auth";
import * as jwt from 'jsonwebtoken'


export class JWTAuthService implements IAuthService {
  decodeJWT(token: string): JWTClaim | false {
    try {
      const payload = jwt.verify(token, authConfig.secret);
      return payload as JWTClaim; 
    } catch (error: any) {
      return false;
    }
  }
  signJWT(payload: JWTClaim): string {
    return jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.tokenExpiryTime
    })
  }
}