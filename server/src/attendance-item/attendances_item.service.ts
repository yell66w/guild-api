import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance_Item_Repository } from './attendance_item.repository';
import { Attendance_Item } from './attendance_item.entity';
import { Item } from 'src/items/items.entity';
import { AddDropDto } from './dto/addDrop.dto';

@Injectable()
export class Attendance_Item_Service {
  constructor(
    @InjectRepository(Attendance_Item_Repository)
    private attendanceItemRepository: Attendance_Item_Repository,
  ) {}

  async addDrop(addDropDto: AddDropDto): Promise<Attendance_Item> {
    const { itemId, qty, attendanceId } = addDropDto;
    const found = Item.findOne(itemId);
    if (found) {
      const alreadyExists = await this.attendanceItemRepository.findOne({
        itemId,
        attendanceId,
      });
      if (!alreadyExists) {
        return await this.attendanceItemRepository.save({
          attendanceId,
          itemId,
          qty,
        });
      } else {
        throw new BadRequestException('Drop item already exists on attendance');
      }
    } else {
      throw new NotFoundException('Drop item does not exist.');
    }
  }
  async updateDrop(id: number, qty: number): Promise<Attendance_Item> {
    const res = await this.attendanceItemRepository.update(id, { qty });
    if (res.affected > 0) {
      return await this.attendanceItemRepository.findOne(id);
    } else {
      throw new BadRequestException('Updating failed');
    }
  }

  async deleteDrop(id: number): Promise<boolean> {
    const res = await this.attendanceItemRepository.delete(id);
    if (res.affected > 0) {
      return true;
    } else {
      throw new BadRequestException('Cannot delete drop');
    }
  }
}
