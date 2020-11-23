import { HttpModule, Module } from '@nestjs/common';
import { DatabaseProviderModule } from 'src/database-provider/database-provider.module';
import { UserCompanyModule } from 'src/user-company/user-company.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';


@Module({
  imports: [DatabaseProviderModule, UserCompanyModule, HttpModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: []
})
export class USerModule {}