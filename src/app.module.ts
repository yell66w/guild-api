import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserHttpModule } from './users/users-http.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserHttpModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
