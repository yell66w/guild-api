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
import { UpdateDropDto } from './dto/updateDrop';
import { Attendance } from 'src/attendances/attendances.entity';

@Injectable()
export class Attendance_Item_Service {
  constructor(
    @InjectRepository(Attendance_Item_Repository)
    private attendanceItemRepository: Attendance_Item_Repository,
  ) {}

  async addDrop(addDropDto: AddDropDto): Promise<Attendance_Item> {
    const { itemId, qty, attendanceId } = addDropDto;

    /** Check if item and attendance is legit */
    const item = await Item.findOne(itemId);
    const attendance = await Attendance.findOne(attendanceId, {
      relations: ['guild'],
    });

    /** Only execute if item and attendance is legit */
    if (item && attendance) {
      /** Check if Attendance and Item relationship already exists */
      const alreadyExists = await this.attendanceItemRepository.findOne({
        itemId,
        attendanceId,
      });

      /** Only Add Drop if relationship does not exist */
      if (!alreadyExists) {
        const { gp_price } = item;
        const totalItemPrice = qty * item.gp_price;

        /** Modify Item quantity */
        item.qty += qty;

        /** Modify ATTENDANCE total GP */
        attendance.gp_total += totalItemPrice;

        /** Modify GUILD weekly GP */
        attendance.guild.weeklyGP += totalItemPrice;

        /** Save Item, Attendance, and their Relationship */
        await Item.save(item);
        await Attendance.save(attendance);
        return await this.attendanceItemRepository.save({
          attendanceId,
          itemId,
          qty,
          gp_price,
        });
      } else {
        throw new BadRequestException('Drop item already exists on attendance');
      }
    } else {
      throw new NotFoundException('Drop item or Attendance does not exist.');
    }
  }
  async updateDrop(
    id: number,
    updateDropDto: UpdateDropDto,
  ): Promise<Attendance_Item> {
    const { qty } = updateDropDto;

    /** Check if attendance & item relationship exists */
    const attendance_item = await this.attendanceItemRepository.findOne(id);
    if (attendance_item) {
      /** Find item & attendance with guild relationship */
      const attendance = await Attendance.findOne(
        attendance_item.attendanceId,
        { relations: ['guild'] },
      );
      const item = await Item.findOne(attendance_item.itemId);

      /** Compute Total Drop Item Price */
      const gp_price = item.gp_price;
      const oldTotalItemPrice = attendance_item.qty * attendance_item.gp_price;
      const newTotalItemPrice = qty * gp_price;

      /** Modify Item Quantity */
      item.qty -= attendance_item.qty;
      item.qty += qty;

      /** Modify GP Total Of Attendance */
      attendance.gp_total -= oldTotalItemPrice;
      attendance.gp_total += newTotalItemPrice;

      /** Modify Guild's Weekly GP */
      attendance.guild.weeklyGP -= oldTotalItemPrice;
      attendance.guild.weeklyGP += newTotalItemPrice;

      /** Save Item, Attendance and their relationship */
      await Attendance.save(attendance);
      await Item.save(item);
      const res = await this.attendanceItemRepository.update(id, {
        qty,
        gp_price,
      });

      /** Only return attendance & item relationship data if update was successfull */
      if (res.affected > 0) {
        return await this.attendanceItemRepository.findOne(id);
      } else {
        throw new BadRequestException('Updating failed');
      }
    } else {
      throw new NotFoundException(
        'Attendance and Drop Item relationship does not exist',
      );
    }
  }
  async deleteDrop(id: number): Promise<boolean> {
    const attendance_item = await this.attendanceItemRepository.findOne(id);

    /** Check if attendance and item relationship exists */
    if (attendance_item) {
      const item = await Item.findOne(attendance_item.itemId);
      const attendance = await Attendance.findOne(
        attendance_item.attendanceId,
        {
          relations: ['guild'],
        },
      );

      const totalItemPrice = attendance_item.qty * attendance_item.gp_price;

      /** Modify Item Quantity */
      item.qty -= attendance_item.qty;

      /** Modify Attendance Total GP */
      attendance.gp_total -= totalItemPrice;

      /** Modify GUILD Weekly GP */
      attendance.guild.weeklyGP -= totalItemPrice;

      /** Save Item and Attendance */
      await Item.save(item);
      await Attendance.save(attendance);

      /** Delete Item and Attendance Relationship */
      const res = await this.attendanceItemRepository.delete(id);
      if (res.affected > 0) {
        return true;
      } else {
        throw new BadRequestException('Cannot delete drop');
      }
    } else {
      throw new NotFoundException(
        'Attendance and Drop Item relationship does not exist',
      );
    }
  }
}
