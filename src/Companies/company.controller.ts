import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { DeleteResult, ObjectLiteral } from 'typeorm';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyInsertDto } from './dto/company-insert.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private companyService: CompanyService
    ) { }

    @Post()
    async create(@Body() company: CompanyInsertDto): Promise<number> {
        try {
            const newCompany = await this.companyService.create(company);
            return newCompany.id;
        } catch (error) {
            throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Company>{
        try {
            const company = await this.companyService.findOneById(id);

            return company;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':companyId')
    async deleteById(@Param('companyId') companyId: number): Promise<DeleteResult>{
        try {
            const deleteResult = await this.companyService.deleteById(companyId);

            return deleteResult;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}