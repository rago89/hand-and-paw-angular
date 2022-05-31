import { User } from './User';

export interface AuthResponseData {
  token: string;
  refreshToken: string;
  expiresIn: string;
  user: User;
  refreshTokenExpiresIn: string;
}
