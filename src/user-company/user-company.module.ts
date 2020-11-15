import { Module } from '@nestjs/common';
import { DatabaseProviderModule } from 'src/database-provider/database-provider.module';
import { usersCompanyProviders } from './user-company.provider';
import { UserCompanyService } from './user-company.service';

@Module({
    imports: [DatabaseProviderModule],
    controllers: [],
    providers: [...usersCompanyProviders, UserCompanyService],
    exports: [UserCompanyService]
})
export class UserCompanyModule {}
