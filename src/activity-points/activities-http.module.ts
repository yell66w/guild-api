import { Module } from '@nestjs/common';
import { ActivityPointsModule } from './activity-points.module';
import { ActivityPointsService } from './activity-points.service';
import { ActivityPointsController } from './activity-points.controller';

@Module({
  imports: [ActivityPointsModule],
  providers: [ActivityPointsService],
  controllers: [ActivityPointsController],
  exports: [ActivityPointsService],
})
export class ActivityPointsHttpModule {}
