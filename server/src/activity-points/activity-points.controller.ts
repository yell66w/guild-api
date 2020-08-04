import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseUUIDPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ActivityPoint } from './activity-points.entity';
import { ActivityPointsService } from './activity-points.service';
import { CreateActivityPointDto } from './dto/create-activity-point.dto';
import { UpdateActivityPointDto } from './dto/update-activity-point.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('activity-points')
@UseGuards(new JwtAuthGuard())
export class ActivityPointsController {
  constructor(private activityPointsService: ActivityPointsService) {}
  @Get()
  getActivityPoints(): Promise<ActivityPoint[]> {
    return this.activityPointsService.getAllActivityPoints();
  }

  @Post()
  createActivityPoint(
    @Body() createActivityPointDto: CreateActivityPointDto,
  ): Promise<ActivityPoint> {
    return this.activityPointsService.createActivityPoint(
      createActivityPointDto,
    );
  }

  @Put(':id')
  updateActivityPoint(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateActivityPointDto: UpdateActivityPointDto,
  ): Promise<ActivityPoint> {
    return this.activityPointsService.updateActivityPoint(
      id,
      updateActivityPointDto,
    );
  }

  @Delete(':id')
  deleteActivityPoint(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    return this.activityPointsService.deleteActivityPoint(id);
  }
}
