export interface JWTClaim {
  userId: number;
  email: string;
  name: string;
}

export type JWTToken = string;