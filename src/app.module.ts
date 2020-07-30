import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserHttpModule } from './users/users-http.module';
import { AuthHttpModule } from './auth/auth-http.module';
import { ActivityHttpModule } from './activities/activities-http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserHttpModule,
    AuthHttpModule,
    ActivityHttpModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
