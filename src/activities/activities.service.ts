import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Activity } from './activities.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivitiesRepository } from './activities.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivitiesRepository)
    private activitiesRepository: ActivitiesRepository,
  ) {}
  async getActivities(): Promise<Activity[]> {
    return await this.activitiesRepository.find({
      relations: ['activityPoints'],
    });
  }
  async getOne(id: number): Promise<Activity> {
    const found = this.activitiesRepository.findOne(id);
    if (!found) throw new NotFoundException('Activity Not Found');
    return found;
  }
  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    try {
      return await this.activitiesRepository.save(createActivityDto);
    } catch (error) {
      throw new ConflictException('Activity already exists');
    }
  }
  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    try {
      await this.activitiesRepository.update(id, updateActivityDto);
      return await this.getOne(id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Activity name already in use');
      }
    }
  }
  async deleteActivity(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}
