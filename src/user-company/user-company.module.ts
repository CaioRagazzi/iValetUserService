import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from 'src/database-provider/database-provider.module';
import { USerModule } from 'src/Users/user.module';
import { UserCompanyController } from './user-company.controller';
import { usersCompanyProviders } from './user-company.provider';
import { UserCompanyService } from './user-company.service';

@Module({
    imports: [DatabaseProviderModule, USerModule],
    controllers: [UserCompanyController],
    providers: [...usersCompanyProviders, UserCompanyService],
    exports: [UserCompanyService]
})
export class UserCompanyModule {}
