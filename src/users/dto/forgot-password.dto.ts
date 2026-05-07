import { IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
  @IsEmail({}, { message: 'Email invalide.' })
  email: string;
}
