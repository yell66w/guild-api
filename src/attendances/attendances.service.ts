import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendancesRepository } from './attendances.repository';
import { Attendance } from './attendances.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Activity } from 'src/activities/activities.entity';
import { triggerAsyncId } from 'async_hooks';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(AttendancesRepository)
    private attendancesRepository: AttendancesRepository,
  ) {}

  async getAttendances(): Promise<Attendance[]> {
    return await this.attendancesRepository.find();
  }
  async getOne(id: number): Promise<Attendance> {
    const found = await this.attendancesRepository.findOne(id);
    if (!found) throw new NotFoundException('Attendance Not Found');
    return found;
  }
  async createAttendance(
    author: string,
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    const { activityId, remarks, result, ap_worth } = createAttendanceDto;
    const activity = await Activity.findOne(activityId);
    if (!activity) throw new NotFoundException('Activity Not Found');

    const { name } = activity;

    try {
      return await this.attendancesRepository.save({
        name,
        remarks,
        result,
        author,
        ap_worth,
        activity,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async updateAttendance(
    id: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    try {
      await this.attendancesRepository.update(id, updateAttendanceDto);
      return await this.getOne(id);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  async deleteAttendance(id: number): Promise<any> {
    const result = await this.attendancesRepository.delete(id);
    if (result.affected <= 0) {
      throw new NotFoundException('Attendance does not exist');
    }
  }
}
