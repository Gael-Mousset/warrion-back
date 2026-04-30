import { Model } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async login(loginUserDto: LoginUserDTO): Promise<User> {
    const user = await this.findByEmail(loginUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const isValid = await argon2.verify(user.password, loginUserDto.password);
    if (!isValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return user;
  }
}
