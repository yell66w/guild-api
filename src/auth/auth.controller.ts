import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthService } from './auth.service';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto copy';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from 'src/users/users.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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
  ): Promise<any> {
    return this.authService.signIn(authSignInCredentials);
  }

  @Post('change-password')
  @UseGuards(new JwtAuthGuard())
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(user.id, changePasswordDto);
  }
}
