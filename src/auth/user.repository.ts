import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { handleUserSaveError } from './utils';
import { SignInDto } from './dto/sign-in.dto';
import { isEmail } from 'class-validator';
import { SignUpOkResponse } from './typings/sign-up-ok.response';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(
    password: User['password'],
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signUp(signUpDto: SignUpDto): Promise<SignUpOkResponse> {
    const { name, email, password } = signUpDto;

    const salt = await bcrypt.genSalt();

    const new_user = new User();

    new_user.name = name;
    new_user.email = email;
    new_user.salt = salt;
    new_user.password = await this.hashPassword(password, salt);
    new_user.created_at = Date.now().toString();

    try {
      await new_user.save();
    } catch (e) {
      handleUserSaveError(e.code);
    }

    return {
      name: new_user.name,
      email: new_user.email,
    };
  }

  async validateUserPassword(signInDto: SignInDto): Promise<string | null> {
    const { email_or_name, password } = signInDto;
    let user: User;

    if (isEmail(email_or_name)) {
      user = await this.findOne({ email: email_or_name });
    } else {
      user = await this.findOne({ name: email_or_name });
    }

    if (user) {
      const password_valid = user.validatePassword(password);

      if (password_valid) {
        return user.name;
      }
    }

    return null;
  }
}
