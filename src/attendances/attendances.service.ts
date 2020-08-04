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
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance_User } from 'src/attendance-user/attendance_user.entity';
import { Attendance_Item } from 'src/attendance-item/attendance_item.entity';

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
      relations: ['participants'],
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
  ): Promise<Attendance> {
    const {
      activityId,
      remarks,
      result,
      ap_worth,
      items,
    } = createAttendanceDto;
    const activity = await Activity.findOne(activityId);
    if (!activity) throw new NotFoundException('Activity Not Found');

    const { name } = activity;

    try {
      const attendance = await this.attendancesRepository.save({
        name,
        remarks,
        result,
        author,
        ap_worth,
        activity,
      });

      if (items.length > 0) {
        items.map(async item => {
          const { itemId, qty } = item;
          await Attendance_Item.create({
            attendance,
            itemId,
            qty,
          }).save();
        });
      }
      return attendance;
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
  async updateAttendance(
    id: number,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    try {
      const { items, status, result, remarks, ap_worth } = updateAttendanceDto;
      const modifiedAttendanceDto = { status, result, remarks, ap_worth };

      //modify attendance and items for updating items or removing items from the attendance
      await this.attendancesRepository.update(id, modifiedAttendanceDto);
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
