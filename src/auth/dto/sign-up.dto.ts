import { User } from "../user.entity";
import { IsString, MinLength, MaxLength, IsEmail, Matches } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: User['email'];

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  name: User['name'];

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: User['password'];
}
