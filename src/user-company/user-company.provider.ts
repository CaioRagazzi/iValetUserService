import { UserCompany } from "./user-company.entity";

export const usersCompanyProviders = [
  {
    provide: 'USER_COMPANY_REPOSITORY',
    useValue: UserCompany,
  },
];