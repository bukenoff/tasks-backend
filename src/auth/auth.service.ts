import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './typings/jwt-payload.interface';
import { SignUpOkResponse } from './typings/sign-up-ok.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpOkResponse> {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user_name = await this.userRepository.validateUserPassword(signInDto);

    if (!user_name) {
      throw new UnauthorizedException('Login data is incorrect');
    }

    const payload: JwtPayload = { name: user_name };

    const access_token = await this.jwtService.sign(payload);

    return { access_token };
  }
}
