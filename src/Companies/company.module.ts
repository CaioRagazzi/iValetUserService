import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from 'src/database-provider/database-provider.module';
import { CompanyController } from './company.controller';
import { companyProviders } from './company.provider';
import { CompanyService } from './company.service';

@Module({
  imports: [DatabaseProviderModule],
  providers: [...companyProviders, CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
