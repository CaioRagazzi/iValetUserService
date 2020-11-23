import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Param,
  Put,
  Query,
  Patch
} from '@nestjs/common';
import { Company, UserGetByIdResponseDto } from './dtos/user-get-by-id-response.dto';
import { UserInsertRequestDto } from './dtos/user-insert-request.dto';
import { UserInsertResponseDto } from './dtos/user-insert-response.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('createUserCompany')
  async create(@Body() user: UserInsertRequestDto): Promise<UserInsertResponseDto> {
    try {
      const userCreated = await this.userService.createUserCompany(user);
      const userDtoResponse = new UserInsertResponseDto()
      userDtoResponse.email = userCreated.email;
      userDtoResponse.name = userCreated.name;
      userDtoResponse.perfil = userCreated.perfil;

      return userDtoResponse;
    } catch (error) {      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async GetById(@Param('userId') userId: number): Promise<UserGetByIdResponseDto> {
    try {      
      const user = await this.userService.findOneById(userId);

      const userReturn = new UserGetByIdResponseDto();
      userReturn.id = user.id;
      userReturn.name = user.name;
      userReturn.email = user.email;
      userReturn.perfil = user.perfil;
      userReturn.createddAt = user.createdAt;
      userReturn.updatedAt = user.updatedAt;
      userReturn.companies = [];

      await Promise.all(user.companies.map((userCompany) => {
        const company = new Company();
        company.companyId = userCompany.companyId;
        userReturn.companies.push(company)
      }));
      
      return userReturn;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/email/me')
  async GetByEmail(@Query('email') email: string): Promise<UserGetByIdResponseDto> {    
    try {
      const user = await this.userService.findOneByEmail(email);

      const userReturn = new UserGetByIdResponseDto();
      userReturn.id = user.id;
      userReturn.name = user.name;
      userReturn.email = user.email;
      userReturn.password = user.password;
      userReturn.perfil = user.perfil;
      userReturn.createddAt = user.createdAt;
      userReturn.updatedAt = user.updatedAt;
      userReturn.companies = [];

      await Promise.all(user.companies.map((userCompany) => {
        const company = new Company();
        company.companyId = userCompany.companyId;
        userReturn.companies.push(company)
      }));
      
      return userReturn;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':userId')
  async Update(
    @Body() user: UserUpdateDto,
    @Param('userId') id: number,
  ) {
    try {
      const userUpdated = await this.userService.update(id, user);

      const userReturn = new UserGetByIdResponseDto();
      userReturn.id = userUpdated.id;
      userReturn.name = userUpdated.name;
      userReturn.email = userUpdated.email;
      userReturn.perfil = userUpdated.perfil;
      userReturn.createddAt = userUpdated.createdAt;
      userReturn.updatedAt = userUpdated.updatedAt;
      userReturn.companies = [];

      await Promise.all(userUpdated.companies.map((userCompany) => {
        const company = new Company();
        company.companyId = userCompany.companyId;
        userReturn.companies.push(company)
      }));
      
      return userReturn;
    } catch (error) {
      if (error?.errors[0]?.message === 'email must be unique') {
        throw new HttpException('Email must be unique', HttpStatus.BAD_REQUEST);
      }
      
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('update-password/me')
  async UpdatePassword(
    @Query('hash') hash: string,
    @Query('password') password: string,
  ) {
    try {
      const userRet = await this.userService.updatePassword(hash, password);
      return userRet;
    } catch (error) {
      if (error.message) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
