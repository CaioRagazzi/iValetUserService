import { Sequelize } from 'sequelize-typescript';
import { UserCompany } from 'src/user-company/user-company.entity';
import { User } from '../Users/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATA_HOST,
        port: +process.env.PORT,
        username: process.env.USER_NAME,
        password: process.env.USER_PASSWORD,
        database: process.env.DATABASE,
      });
      sequelize.addModels([User, UserCompany]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
