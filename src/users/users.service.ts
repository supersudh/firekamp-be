import { Injectable, Inject, NotAcceptableException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateFavoriteBookDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async create(fullName: string, email: string, password: string) {
    const emailAlreadyExists = await this.userRepository.count({
      where: { email },
    });
    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return this.userRepository.save({
      fullName,
      email,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.userRepository.find({});
  }

  async findByEmail(email: string) {
    const foundUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return foundUser;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
