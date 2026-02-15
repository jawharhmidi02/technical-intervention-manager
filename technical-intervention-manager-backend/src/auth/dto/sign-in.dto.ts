import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignInDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  role: Role;
}
