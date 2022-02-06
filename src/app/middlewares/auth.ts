import { IAuthService } from '@/domain/services/auth-service';
import { Request, Response, NextFunction } from 'express';

export class Middleware {
  private authService: IAuthService;

  constructor(
    authService: IAuthService
  ) {
    this.authService = authService
  }

  enableAuth() {
    return (
      req: Partial<Request>, res: Partial<Response>, next: NextFunction
    ): void => {
      const token = req.headers?.['x-access-token'];
      if (token) {
        const decoded = this.authService.decodeJWT(token as string);
        if (!!decoded === false) {
          res.status?.(403).send({
            message: 'No access token provided'
          });
          return;
        } else {
          req.decoded = decoded
          next();
        }
      } else {
        res.status?.(403).send({
          message: 'No access token provided'
        });
      }
    }
  }
}