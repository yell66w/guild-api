import { Controller, Post, Body } from '@nestjs/common';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthService } from './auth.service';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto copy';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(
    @Body() authSignUpCredentials: AuthSignUpCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authSignUpCredentials);
  }

  @Post('sign-in')
  signIn(
    @Body() authSignInCredentials: AuthSignInCredentialsDto,
  ): Promise<void> {
    return this.authService.singIn(authSignInCredentials);
  }
}
