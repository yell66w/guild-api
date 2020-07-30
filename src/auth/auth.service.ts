import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInCredentialsDto } from '../auth/dto/auth-signin-credentials.dto copy';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}
  async signUp(credentials: AuthSignUpCredentialsDto): Promise<void> {
    const { password, confirmPassword } = credentials;
    if (password === confirmPassword) {
      try {
        await this.authRepository.signUp(credentials);
      } catch (error) {
        throw new ConflictException('Invalid Form Submission');
      }
    } else {
      throw new ConflictException('Passwords must match');
    }
  }

  async validateUser(credentials: AuthSignInCredentialsDto): Promise<User> {
    const { username, password } = credentials;
    const user = await this.authRepository.findOne({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async signIn(credentials) {
    const user = await this.validateUser(credentials);
    const { username, id, IGN } = user;
    const payload = { username, id, IGN };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
