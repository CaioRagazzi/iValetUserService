import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  perfil: number;
}
