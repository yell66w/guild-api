import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthHttpModule {}
