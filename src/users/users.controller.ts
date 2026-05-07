import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO): Promise<User> {
    return await this.usersService.login(loginUserDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDTO): Promise<{ token: string }> {
    return await this.usersService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDTO): Promise<{ message: string }> {
    await this.usersService.resetPassword(dto.token, dto.newPassword);
    return { message: 'Mot de passe réinitialisé avec succès.' };
  }
}
