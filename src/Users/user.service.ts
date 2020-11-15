import { Inject, Injectable } from '@nestjs/common';
import { UserInsertDto } from './dtos/user-insert.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { UserUpdateDto } from './dtos/user-update.dto';
import { AES, enc } from 'crypto-js';
import { differenceInMinutes } from 'date-fns';
import { User } from './user.entity';
import { UserCompanyService } from 'src/user-company/user-company.service';
import { UserCompany } from 'src/user-company/user-company.entity';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User, private userCompanyService: UserCompanyService) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(userDto: UserInsertDto): Promise<User> {
    const duplicateUser = await this.userRepository.findOne({where: { email: userDto.email} })

    if (duplicateUser) {
      throw new Error(`User with email ${userDto.email} already exists`);
    }

    const user = await this.userRepository.create<User>({
      name: userDto.name,
      email: userDto.email,
      password: this.hashPassword(userDto.password),
      perfil: userDto.perfil,
    });

    const savedUser = await user.save();

    this.userCompanyService.create(savedUser.id, userDto.companyId);

    return savedUser;
  }

  async findOneById(userId: number): Promise<User> {
    const user = await this.userRepository.findByPk(userId, {include: [UserCompany]});
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  async update(userId: number, userDto: UserUpdateDto): Promise<User> {
    const user = await this.findOneById(userId);

    if (!user || user === null) {
      throw new Error(`User with id ${userId} not found`);
    }

    user.name = userDto.name;
    user.password = this.hashPassword(userDto.password);
    user.perfil = userDto.perfil;

    const updatedUser = await user.save();

    return updatedUser;
  }

  async updatePassword(hash: string, password: string) {
    const decryptedMessage = this.decryptMessage(hash);
    const arr = decryptedMessage.split('|');
    const dateInitial = new Date(+arr[1], +arr[2], +arr[3], +arr[4], +arr[5]);

    if (this.isSessionForChangePasswordIsExpired(dateInitial)) {
      throw new Error('Session Expired');
    }

    const userRet = await this.userRepository.findByPk(arr[0]);

    if (!userRet || userRet === null) {
      throw new Error(`User with id ${arr[0]} not found`);
    }

    userRet.password = this.hashPassword(password);

    const updatedUser = userRet.save();
    return updatedUser;
  }

  private hashPassword(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    return hash;
  }

  private decryptMessage(message: string): string {
    const idDecrypted = AES.decrypt(message, process.env.SECRET_CRYPTO);
    const decryptedMessage = idDecrypted.toString(enc.Utf8);

    return decryptedMessage;
  }

  private isSessionForChangePasswordIsExpired(initialDate: Date): boolean {
    const diff = differenceInMinutes(initialDate, new Date());
    if (diff <= -120) {
      return true;
    } else {
      return false;
    }
  }

  // async sendEmailForgotPassword(to: string, userId: number): Promise<void> {
  //   const currentDate = new Date();
  //   const year = getYear(currentDate);
  //   const month = getMonth(currentDate);
  //   const day = getDate(currentDate);
  //   const hour = getHours(currentDate);
  //   const minutes = getMinutes(currentDate);

  //   const encriptMessage = `${userId}|${year}|${month}|${day}|${hour}|${minutes}`;

  //   const user = await this.findOneById(userId);

  //   const text = `
  //   <p>Olá <b>${user.name},</b></p>
  //   <p>Você solicitou o restart de sua senha, favor clicar no link abaixo e realizar a alteração:</p>
  //   <p>http://ragazzitech.caioragazzi.com:82/resetpassword?hash=${AES.encrypt(
  //     encriptMessage,
  //     process.env.SECRET_CRYPTO,
  //   )}</p>
  //   <p>Atenciosamente,</p>
  //   <p>Equipe iValet</p>
  //   `;
  //   const subject = 'Forgot password';

  //   this.sendEmailService.sendEmail(to, subject, text.toString());
  // }
}
