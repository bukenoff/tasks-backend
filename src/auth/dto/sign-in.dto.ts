import { User } from '../user.entity';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @IsString()
  email_or_name: User['email'] | User['name'];

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: User['password'];
}
