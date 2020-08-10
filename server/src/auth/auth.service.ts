import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { AuthSignInCredentialsDto } from './dto/auth-signin-credentials.dto copy';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SendGPSDto } from './dto/send-gps.dto';
import { MarkAttendanceDto } from '../attendance-user/dto/mark-attendance.dto';
import { UserStatus } from 'src/users/users.categories';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}
  async signUp(credentials: AuthSignUpCredentialsDto): Promise<any> {
    const { password, confirmPassword } = credentials;
    if (password === confirmPassword) {
      const found = await this.authRepository.findOne({
        where: [{ username: credentials.username }, { IGN: credentials.IGN }],
      });
      if (found) throw new UnauthorizedException('User already exists!');
      try {
        await this.authRepository.signUp(credentials);
        return {
          message:
            "Your request to join the guild has been received. Please wait for the admin's approval.",
        };
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
      where: { username, status: UserStatus.APPROVED },
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

  async signIn(credentials: AuthSignInCredentialsDto) {
    const user = await this.validateUser(credentials);
    const { username, id, IGN, role, status } = user;
    const payload = { username, id, IGN, role, status };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async getOne(id: number): Promise<User> {
    const found = await this.authRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('User not found');
    }
    return found;
  }
  async sendGPS(
    userId: number,
    receiverId: number,
    sendGPSDto: SendGPSDto,
  ): Promise<any> {
    const user = await this.getOne(userId);
    const receiver = await this.getOne(receiverId);
    const { amount } = sendGPSDto;
    if (user.gp >= amount && amount > 0) {
      return await this.authRepository.sendGPS(user, receiver, amount);
    } else {
      throw new MethodNotAllowedException('Please check your GP');
    }
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const { oldPassword, newPassword, confirmNewPassword } = changePasswordDto;
    const user = await this.getOne(id);
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      throw new UnauthorizedException('Password is not correct');
    }
    if (newPassword !== confirmNewPassword) {
      throw new UnauthorizedException('Passwords does not match');
    }

    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, user.salt);
    await this.authRepository.save(user);

    return true;
  }

  async markAttendance(
    userId: number,
    attendanceId: number,
    markAttendanceDto: MarkAttendanceDto,
  ): Promise<any> {
    return this.authRepository.markAttendance(
      userId,
      attendanceId,
      markAttendanceDto,
    );
  }
}
