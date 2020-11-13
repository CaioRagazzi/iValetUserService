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
import { UserInsertDto } from './dtos/user-insert.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: UserInsertDto): Promise<User> {
    try {
      const userRet = await this.userService.create(user);
      return userRet;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  async GetById(@Param('userId') userId: number): Promise<UserDocument> {
    try {      
      const userRet = await this.userService.findOneById(userId);
      
      return userRet;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/email/me')
  async GetByEmail(@Query('email') email: string): Promise<User> {    
    try {
      const userRet = await this.userService.findOneByEmail(email);
      return userRet;
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
      const userRet = await this.userService.update(id, user);
      return userRet;
    } catch (error) {
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

  // @Post('SendEmailForgotPassword')
  // async sendEmailForgotPassword(
  //   @Body() message: SendEmailForgotPasswordDto,
  // ): Promise<void> {
  //   try {
  //     const userRet = await this.userService.findOneByEmail(message.to);
  //     if (userRet) {
  //       this.userService.sendEmailForgotPassword(message.to, userRet.id);
  //     } else {
  //       throw new HttpException('Error sending email', HttpStatus.BAD_REQUEST);
  //     }
  //   } catch (error) {
  //     throw new HttpException(error.sqlMessage, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
