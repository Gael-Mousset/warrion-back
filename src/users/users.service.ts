import { Model } from 'mongoose';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDTO): Promise<User> {
    try {
      const hashedPassword = await argon2.hash(createUserDto.password);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      return await newUser.save();
    } catch (err: any) {
      if (err.code === 11000) {
        throw new ConflictException('Cet email est déjà utilisé.');
      }
      throw err;
    }
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

  async forgotPassword(email: string): Promise<{ token: string }> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Aucun compte associé à cet email.');
    }
    const token =
      Math.random().toString(36).slice(2) +
      Math.random().toString(36).slice(2) +
      Date.now().toString(36);
    const expires = new Date(Date.now() + 3600000); // 1 heure

    await this.userModel.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });

    return { token };
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Token invalide ou expiré.');
    }

    const hashedPassword = await argon2.hash(newPassword);
    await this.userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  }
}
