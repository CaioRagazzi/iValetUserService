import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/Users/user.entity';

@Table
export class UserCompany extends Model<UserCompany> {
  @ForeignKey(() => User)
  userId: User[];

  @Column
  companyId: number;
}
