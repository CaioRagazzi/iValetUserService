import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/Companies/company.entity';
import { UserCompanyInsertRequestDto } from 'src/user-company/dtos/user-insert-request.dto';
import { User } from 'src/Users/user.entity';
import { UserService } from 'src/Users/user.service';
import { getManager, Repository } from 'typeorm';
import { UserCompany } from './user-company.entity';

@Injectable()
export class UserCompanyService {
  constructor(
    @Inject('USER_COMPANY_REPOSITORY')
    private usercompanyRepository: Repository<UserCompany>,
    private userService: UserService
  ) {}

  async createUserCompany(userDto: UserCompanyInsertRequestDto): Promise<User> {
    const duplicateUser = await this.userService.findOneByEmail(userDto.email);

    if (duplicateUser) {
      throw new Error(`User with email ${userDto.email} already exists`);
    }

    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = this.userService.hashPassword(userDto.password);
    user.perfil = userDto.perfil;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    let createdUser: User;

    await getManager().transaction(async transaction => {
      const company = new Company();
      company.name = userDto.companyName;
      company.createdAt = new Date();
      company.updatedAt = new Date();
      const createdCompany = await transaction.save(company);
      createdUser = await transaction.save<User>(user);
      const userCompany = new UserCompany();
      userCompany.userId = createdUser.id;
      userCompany.companyId = createdCompany.id
      transaction.save<UserCompany>(userCompany);
    });


    return createdUser;
  }
}
