import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  role: Role;
}
