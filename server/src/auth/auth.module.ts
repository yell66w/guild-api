import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthRepository])],
  exports: [TypeOrmModule],
})
export class AuthModule {}
