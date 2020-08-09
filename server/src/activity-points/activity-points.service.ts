import {
  Injectable,
  NotFoundException,
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
    if (activity) {
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
    } else {
      throw new NotFoundException('Activity does not exist');
    }
  }
  async updateActivityPoint(
    id: number,
    updateActivityPointDto: UpdateActivityPointDto,
  ): Promise<ActivityPoint> {
    const activityPoint = await this.activityPointsRepository.findOne(id);
    if (!activityPoint)
      throw new NotFoundException('Activity Point does not exist!');

    if (updateActivityPointDto.ap) {
    }

    const updatedActivityPoint = {
      ...activityPoint,
      ...updateActivityPointDto,
    };
    return await this.activityPointsRepository.save(updatedActivityPoint);
  }
  async deleteActivityPoint(id: number): Promise<void> {
    //issue do not return voids/any
    const result = await this.activityPointsRepository.delete(id);
    if (result.affected && result.affected <= 0)
      throw new NotFoundException('Activity Point does not exist');
  }
}
