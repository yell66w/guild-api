import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendancesRepository } from './attendances.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttendancesRepository])],
  exports: [TypeOrmModule],
})
export class AttendancesModule {}
