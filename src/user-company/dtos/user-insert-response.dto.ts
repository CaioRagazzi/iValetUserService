import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
  } from 'class-validator';
  
  export class UserCompanyInsertResponseDto {
    @IsNotEmpty()
    @IsString()
    name: string;BelongsTo
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsNumber()
    @IsNotEmpty()
    perfil: number;
  }
  