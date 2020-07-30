import { Controller, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import { AuthService } from './auth.service';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto copy';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from 'src/users/users.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SendGPSDto } from './dto/send-gps.dto';

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
  @UseGuards(JwtAuthGuard)
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(user.id, changePasswordDto);
  }

  @Post(':id/send-gps')
  @UseGuards(JwtAuthGuard)
  sendGPS(
    @GetUser() user: User,
    @Param('id') receiverId: number,
    @Body() sendGPSDto: SendGPSDto,
  ): Promise<any> {
    return this.authService.sendGPS(user.id, receiverId, sendGPSDto);
  }
}
