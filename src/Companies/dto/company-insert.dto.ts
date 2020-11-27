import { IsNotEmpty, IsString } from "class-validator";

export class CompanyInsertDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}