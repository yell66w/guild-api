import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserHttpModule } from './users/users-http.module';
import { AuthHttpModule } from './auth/auth-http.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(), UserHttpModule, AuthHttpModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
