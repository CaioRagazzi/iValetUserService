import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UserInsertRequestDto {
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

  @IsArray()
  @IsOptional()
  companyId: number[];
}
