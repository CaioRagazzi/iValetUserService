import { IsEmail, IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';
import {  } from 'sequelize-typescript';

export class Company {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}

export class UserGetByIdResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  perfil: number;

  @IsDate()
  @IsNotEmpty()
  createddAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  password: string;

  companies: Company[]
}