import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInCredentialsDto } from '../auth/dto/auth-signin-credentials.dto copy';
import { AuthRepository } from './auth.repository';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}
  async signUp(
    authSignUpCredentialsDto: AuthSignUpCredentialsDto,
  ): Promise<void> {
    try {
      if (
        authSignUpCredentialsDto.password ===
        authSignUpCredentialsDto.confirmPassword
      ) {
        delete authSignUpCredentialsDto.confirmPassword;
        authSignUpCredentialsDto.salt = await bcrypt.genSalt();
        authSignUpCredentialsDto.password = await bcrypt.hash(
          authSignUpCredentialsDto.password,
          authSignUpCredentialsDto.salt,
        );
        await this.authRepository.save(authSignUpCredentialsDto);
      } else {
        throw new ConflictException('Passwords must match');
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Invalid Form Submission');
      } else if (error.message === 'Passwords must match') {
        throw new ConflictException(error.message);
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async singIn(
    authSignInCredentialsDto: AuthSignInCredentialsDto,
  ): Promise<void> {
    const user = await this.authRepository.findOne({
      where: { username: authSignInCredentialsDto.username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await bcrypt.compare(
      authSignInCredentialsDto.password,
      user.password,
    );
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('logged in');
  }
}
