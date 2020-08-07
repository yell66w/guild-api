import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendancesRepository } from './attendances.repository';
import { Attendance } from './attendances.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Activity } from '../activities/activities.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance_User } from '../attendance-user/attendance_user.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(AttendancesRepository)
    private attendancesRepository: AttendancesRepository,
  ) {}
  async getAttendances(): Promise<Attendance[]> {
    return await this.attendancesRepository.find({
      relations: ['participants', 'items'],
    });
  }
  async getOne(id: number): Promise<Attendance> {
    const found = await this.attendancesRepository.findOne(id, {
      relations: ['participants', 'items'],
    });
    if (!found) throw new NotFoundException('Attendance Not Found');
    return found;
  }
  async getParticipants(id: number): Promise<any> {
    const records = Attendance_User.find({
      where: { attendanceId: id },
      relations: ['user'],
    });
    let participants = (await records).map(record => {
      return record.user.IGN;
    });
    return participants;
  }
  async createAttendance(
    author: string,
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<any> {
    const { activityId, remarks, result, ap_worth } = createAttendanceDto;
    const activity = await Activity.findOne(activityId);
    if (!activity) throw new NotFoundException('Activity Not Found');
    const { name } = activity;
    try {
      const attendance: Attendance = await this.attendancesRepository.save({
        name,
        remarks,
        result,
        author,
        ap_worth,
        activity,
      });

      return attendance;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async updateAttendance(
    attendanceId: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    try {
      await this.attendancesRepository.update(
        attendanceId,
        updateAttendanceDto,
      );
      return await this.getOne(attendanceId);
    } catch (error) {
      throw new BadRequestException('Field has no values');
    }
  }

  async deleteAttendance(id: number): Promise<any> {
    const result = await this.attendancesRepository.delete(id);
    if (result.affected <= 0) {
      throw new NotFoundException('Attendance does not exist');
    }
  }
}
