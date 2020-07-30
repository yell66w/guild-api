import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesRepository } from './activities.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ActivitiesRepository])],
  exports: [TypeOrmModule],
})
export class ActivitiesModule {}
