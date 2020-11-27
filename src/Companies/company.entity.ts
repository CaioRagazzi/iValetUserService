
import { UserCompany } from 'src/user-company/user-company.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => UserCompany, userCompany => userCompany.companyId)
  userCompany: UserCompany[];
}