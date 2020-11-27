import { Module } from '@nestjs/common';
import { USerModule } from './Users/user.module';
import { UserCompanyModule } from './user-company/user-company.module';
import { CompanyModule } from './Companies/company.module';

@Module({
  imports: [USerModule, UserCompanyModule, CompanyModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
