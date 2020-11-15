import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { UserCompany } from 'src/user-company/user-company.entity';
import { usersProviders } from './user.providers';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  password: string;

  @Column({unique: true})
  email: string;

  @Column
  perfil: number;

  @HasMany(() => UserCompany)
  companies: UserCompany;
}
