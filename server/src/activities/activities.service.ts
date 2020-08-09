import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Not } from 'typeorm';
import { Activity } from './activities.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivitiesRepository } from './activities.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Attendance } from 'src/attendances/attendances.entity';
import { ActivityCategory } from './activities.categories';
import { Guild } from 'src/guild/guild.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(ActivitiesRepository)
    private activitiesRepository: ActivitiesRepository,
  ) {}
  async getActivities(): Promise<Activity[]> {
    return await this.activitiesRepository.find({
      relations: ['activityPoints', 'attendances'],
    });
  }
  async getOne(id: number): Promise<Activity | undefined> {
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
  ): Promise<Activity | undefined> {
    try {
      await this.activitiesRepository.update(id, updateActivityDto);
      const activity = await this.getOne(id);
      if (updateActivityDto.category) {
        const { category } = updateActivityDto;
        let weeklyGP = 0;
        let weeklyAP = 0;

        const attendances = await Attendance.find({
          select: ['gp_total', 'ap_total'],
          where: { activity, category: Not(category) },
        });
        attendances.map(attendance => {
          if (attendance.category !== category) {
            weeklyGP += attendance.gp_total;
            weeklyAP += attendance.ap_total;
          }
        });
        const guild = await Guild.findOne({ name: 'Bank' });
        if (!guild) throw new NotFoundException('Guild does not exist');

        if (category === ActivityCategory.DEFAULT) {
          guild.weeklyGP -= weeklyGP;
          guild.weeklyAP -= weeklyAP;
        } else if (category === ActivityCategory.PAYDAY) {
          guild.weeklyGP += weeklyGP;
          guild.weeklyAP += weeklyAP;
        }
        await Guild.save(guild);
        await Attendance.update({ activity }, { category });
      }
      return activity;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Activity name already in use');
      } else {
        throw new BadRequestException('Something went wrong');
      }
    }
  }
  async deleteActivity(id: number): Promise<any> {
    const activity = await this.activitiesRepository.findOne(id);
    if (!activity) throw new NotFoundException('Activity does not exist!');
    if (activity.category === ActivityCategory.PAYDAY) {
      let weeklyGP = 0;
      let weeklyAP = 0;
      const attendances = await Attendance.find({
        select: ['gp_total', 'ap_total'],
        where: { activity, category: ActivityCategory.PAYDAY },
      });
      attendances.map(attendance => {
        weeklyGP += attendance.gp_total;
        weeklyAP += attendance.ap_total;
      });
      const guild = await Guild.findOne({ name: 'Bank' });
      if (!guild) throw new NotFoundException('Guild does not exist');
      guild.weeklyGP -= weeklyGP;
      guild.weeklyAP -= weeklyAP;
      await Guild.save(guild);
    }

    const result = await this.activitiesRepository.delete(id);
    if (result.affected && result.affected <= 0)
      throw new NotFoundException('Activity does not exist');
  }
}
