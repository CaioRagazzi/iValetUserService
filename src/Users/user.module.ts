import { HttpModule, Module } from '@nestjs/common';
import { CompanyModule } from 'src/Companies/company.module';
import { DatabaseProviderModule } from 'src/database-provider/database-provider.module';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';


@Module({
  imports: [DatabaseProviderModule, HttpModule, CompanyModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
  exports: [UserService]
})
export class USerModule {}