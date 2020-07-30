import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities.module';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';

@Module({
  imports: [ActivitiesModule],
  providers: [ActivitiesService],
  controllers: [ActivitiesController],
  exports: [ActivitiesService],
})
export class ActivityHttpModule {}
