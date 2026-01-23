import { User } from './hrm.types';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: Partial<User>;
}

export interface LoginPayload {
  email: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}
