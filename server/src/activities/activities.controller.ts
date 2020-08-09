import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './activities.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { CreateActivityValidationPipe } from './pipes/create-activity-validation.pipe';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('activities')
@UseGuards(new JwtAuthGuard())
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Get()
  getActivities(): Promise<Activity[]> {
    return this.activitiesService.getActivities();
  }
  @Get(':id')
  getOne(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<Activity | undefined> {
    return this.activitiesService.getOne(id);
  }

  @Post()
  createActivity(
    @Body(CreateActivityValidationPipe) createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    return this.activitiesService.createActivity(createActivityDto);
  }

  @Put(':id')
  updateActivity(
    @Param('id', ParseUUIDPipe) id: number,
    @Body(CreateActivityValidationPipe) updateActivityDto: UpdateActivityDto,
  ): Promise<Activity | undefined> {
    return this.activitiesService.updateActivity(id, updateActivityDto);
  }
  @Delete(':id')
  deleteActivity(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    return this.activitiesService.deleteActivity(id);
  }
}
