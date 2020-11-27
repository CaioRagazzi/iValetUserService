import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserCompany } from 'src/user-company/user-company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column()
  password: string;

  @Column({unique: true})
  email: string;

  @Column()
  perfil: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => UserCompany, userCompany => userCompany.userId)
  companies: UserCompany[];
}
