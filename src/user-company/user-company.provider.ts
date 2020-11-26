import { Connection } from 'typeorm';
import { UserCompany } from "./user-company.entity";

export const usersCompanyProviders = [
  {
    provide: 'USER_COMPANY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(UserCompany),
    inject: ['DATABASE_CONNECTION'],
  },
];