import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/Users/user.entity';

@Entity()
export class UserCompany {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => User,
    user => user.companies,
  )
  userId: User[];

  @Column()
  companyId: number;
}
