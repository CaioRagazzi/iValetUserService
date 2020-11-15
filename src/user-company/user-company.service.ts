import { Inject, Injectable } from '@nestjs/common';
import { UserCompany } from './user-company.entity';

@Injectable()
export class UserCompanyService {
  constructor(
    @Inject('USER_COMPANY_REPOSITORY')
    private usercompanyRepository: typeof UserCompany,
  ) {}

  async create(userId: number, companyIds: number[]) {
    companyIds.forEach(async (item) => {
      const userCompanies = await this.usercompanyRepository.create<
        UserCompany
      >({
        userId: userId,
        companyId: item
      });

      await userCompanies.save();
    });
  }
}
