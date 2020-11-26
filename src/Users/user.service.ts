import { HttpService, Inject, Injectable } from '@nestjs/common';
import { UserInsertRequestDto } from './dtos/user-insert-request.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './dtos/user-update.dto';
import { AES, enc } from 'crypto-js';
import { differenceInMinutes } from 'date-fns';
import { User } from './user.entity';
import { UserCompanyService } from 'src/user-company/user-company.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    private userCompanyService: UserCompanyService,
    private httpService: HttpService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUserCompany(userDto: UserInsertRequestDto): Promise<User> {
    const duplicateUser = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (duplicateUser) {
      throw new Error(`User with email ${userDto.email} already exists`);
    }

    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = this.hashPassword(userDto.password);
    user.perfil = userDto.perfil;

    const companyIdArray: number[] = [];
    try {
      const companyId = await this.createCompany(userDto.companyName);
      companyIdArray.push(companyId);
    } catch (error) {
      this.userRepository.remove(user);
      throw new Error(error);
    }

    this.userCompanyService.create(user.id, companyIdArray);

    return user;
  }

  async findOneById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async update(userId: number, userDto: UserUpdateDto): Promise<User> {
    const user = await this.findOneById(userId);

    if (!user || user === null) {
      throw new Error(`User with id ${userId} not found`);
    }

    user.name = userDto.name;
    user.email = userDto.email;
    user.password = this.hashPassword(userDto.password);
    user.perfil = userDto.perfil;

    const savedUser = await this.userRepository.save(user);

    const updatedUser = await this.findOneById(savedUser.id);

    return updatedUser;
  }

  async updatePassword(hash: string, password: string) {
    const decryptedMessage = this.decryptMessage(hash);
    const arr = decryptedMessage.split('|');
    const dateInitial = new Date(+arr[1], +arr[2], +arr[3], +arr[4], +arr[5]);

    if (this.isSessionForChangePasswordIsExpired(dateInitial)) {
      throw new Error('Session Expired');
    }

    const userRet = await this.userRepository.findOne(arr[0]);

    if (!userRet || userRet === null) {
      throw new Error(`User with id ${arr[0]} not found`);
    }

    userRet.password = this.hashPassword(password);

    const updatedUser = this.userRepository.save(userRet);
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

  async createCompany(companyName: string) {
    let companyId: number;
    await this.httpService
      .post('http://localhost:3002/company', {
        name: companyName,
      })
      .toPromise()
      .then(res => {
        companyId = res.data.id;
      })
      .catch(err => {
        throw new Error(err.response.data);
      });

    return companyId;
  }
}
