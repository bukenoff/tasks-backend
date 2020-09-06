import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignUpOkResponse } from './typings/sign-up-ok.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiCreatedResponse({
    description: 'User was succesfully created',
    type: SignUpOkResponse,
  })
  @ApiConflictResponse({
    description: 'User with provided credentials already exists',
  })
  signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): Promise<SignUpOkResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiCreatedResponse({
    description: 'User succesfully signed in, token was generated',
  })
  @ApiUnauthorizedResponse({
    description: 'Provided data is incorrect',
  })
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto);
  }
}
