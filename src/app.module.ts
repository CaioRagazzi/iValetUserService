import { Module } from '@nestjs/common';
import { USerModule } from './Users/user.module';
import { UserCompanyModule } from './user-company/user-company.module';

@Module({
  imports: [USerModule, UserCompanyModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
