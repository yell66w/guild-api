import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPointsRepository } from './activity-points.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityPointsRepository])],
  exports: [TypeOrmModule],
})
export class ActivityPointsModule {}
