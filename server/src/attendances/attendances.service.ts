import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendancesRepository } from './attendances.repository';
import { Attendance } from './attendances.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Activity } from '../activities/activities.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance_User } from '../attendance-user/attendance_user.entity';
import { Attendance_Item } from '../attendance-item/attendance_item.entity';
import { Item } from '../items/items.entity';

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
      const attendance: Attendance = await this.attendancesRepository.save({
        name,
        remarks,
        result,
        author,
        ap_worth,
        activity,
      });

      if (items.length > 0) {
        //issue = make each item unique, there should be no duplicate items
        //search how to filter /reduce
        //make em unique

        items.map(async item => {
          const { itemId, qty } = item;
          const itemFound: Item = await Item.findOne(itemId);
          if (itemFound) {
            const newQty = itemFound.qty + qty;
            await Item.update(itemFound.id, { qty: newQty });
            await Attendance_Item.create({
              attendance,
              itemId,
              qty,
            }).save();
          }
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
      //issue modify attendance and items for updating items or removing items from the attendance
      /**
       * UPDATE ATTENDANCE
       * 1. Add an item
       * 2. Add another item
       * 3. Update an existing item
       * 4. Delete an existing item
       */
      const { items, status, result, remarks, ap_worth } = updateAttendanceDto;
      const modifiedAttendanceDto = { status, result, remarks, ap_worth };

      if (items.length > 0) {
        items.map(async item => {
          const { itemId, qty } = item;
          const found = await Attendance_Item.findOne({
            where: {
              itemId,
              attendanceId: id,
            },
          });
          if (found) {
            await Attendance_Item.update(found.id, { qty });
          } else {
            await Attendance_Item.create({
              itemId,
              attendanceId: id,
              qty,
            }).save();
          }
        });
      }
      await this.attendancesRepository.update(id, modifiedAttendanceDto);
      return await this.getOne(id);

      //issue should update item qty too
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
