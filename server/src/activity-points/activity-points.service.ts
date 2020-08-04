import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  NotAcceptableException,
} from '@nestjs/common';
import { ActivityPointsRepository } from './activity-points.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityPoint } from './activity-points.entity';
import { CreateActivityPointDto } from './dto/create-activity-point.dto';
import { Activity } from '../activities/activities.entity';
import { UpdateActivityPointDto } from './dto/update-activity-point.dto';
import { ActivityCategory } from '../activities/activities.categories';

@Injectable()
export class ActivityPointsService {
  constructor(
    @InjectRepository(ActivityPointsRepository)
    private activityPointsRepository: ActivityPointsRepository,
  ) {}

  async getAllActivityPoints(): Promise<ActivityPoint[]> {
    return await this.activityPointsRepository.find();
  }
  async getOne(id: number): Promise<ActivityPoint> {
    const found = await this.activityPointsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Activity Point Not Found');
    }
    return found;
  }
  async createActivityPoint(
    createActivityPointDto: CreateActivityPointDto,
  ): Promise<ActivityPoint> {
    const { activityId } = createActivityPointDto;
    const activity = await Activity.findOne(activityId);
    if (activity.category === ActivityCategory.PAYDAY) {
      delete createActivityPointDto.activityId;
      const activityPoint = await this.activityPointsRepository.save({
        ...createActivityPointDto,
        activity,
      });
      return await this.activityPointsRepository.save(activityPoint);
    } else {
      throw new NotAcceptableException('Activity must be of type PAYDAY');
    }
  }
  async updateActivityPoint(
    id: number,
    updateActivityPointDto: UpdateActivityPointDto,
  ): Promise<ActivityPoint> {
    try {
      await this.activityPointsRepository.update(id, updateActivityPointDto);
      return await this.getOne(id);
    } catch (error) {
      throw new MethodNotAllowedException(
        'Cannot update activity point without values',
      );
    }
  }
  async deleteActivityPoint(id: number): Promise<void> {
    const result = await this.activityPointsRepository.delete(id);
    if (result.affected <= 0)
      throw new NotFoundException('Activity Point does not exist');
  }
}
