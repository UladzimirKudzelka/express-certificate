import mongoose from '../context';
import { RoleEnum } from '../enums';

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: RoleEnum;
  encryptPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJWT(): string;
}
