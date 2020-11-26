import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserCompany } from './user-company.entity';

@Injectable()
export class UserCompanyService {
  constructor(
    @Inject('USER_COMPANY_REPOSITORY')
    private usercompanyRepository: Repository<UserCompany>,
  ) {}

  async create(userId: number, companyIds: number[]) {
    companyIds.forEach(async item => {
      const userCompanies = new UserCompany();

      (userCompanies.userId = userId), (userCompanies.companyId = item);

      await userCompanies.save();
    });
  }
}
