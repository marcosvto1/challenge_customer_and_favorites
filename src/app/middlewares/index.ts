import { Middleware } from "@/app/middlewares/middleware";
import { makeJWTAuthService } from "@/main/factories/services/jwt-auth";

const middleware = new Middleware(makeJWTAuthService());

export { middleware };