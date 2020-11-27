import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/Users/user.entity';
import { Company } from 'src/Companies/company.entity';

@Entity()
export class UserCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    user => user.companies,
  )
  userId: number;

  @ManyToOne(
    () => Company,
    company => company.userCompany,
  )
  companyId: number;
}
