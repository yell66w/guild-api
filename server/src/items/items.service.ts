import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsReposityory } from './items.repository';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemType } from './items.categories';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { Attendance_Item } from 'src/attendance-item/attendance_item.entity';
import { Attendance } from 'src/attendances/attendances.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsReposityory)
    private itemsRepository: ItemsReposityory,
  ) {}

  async getItems(filterDto: GetItemsFilterDto): Promise<Item[]> {
    return await this.itemsRepository.getItems(filterDto);
  }
  async getAllFarmItems(): Promise<Item[]> {
    return await this.itemsRepository.find({ where: { type: ItemType.FARM } });
  }
  async getOne(id: number): Promise<Item> {
    const found = await this.itemsRepository.findOne(id);
    if (!found) throw new NotFoundException('Item does not exist');

    return found;
  }
  async createItem(
    author: string,
    createItemDto: CreateItemDto,
  ): Promise<Item | undefined> {
    try {
      const item = await this.itemsRepository.save({
        ...createItemDto,
        author,
      });
      if (!item) throw new BadRequestException('Item not created');
      return item;
    } catch (error) {
      if (error.code === '23505')
        throw new MethodNotAllowedException('Item already exist');
    }
  }
  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<any> {
    try {
      const res = await this.itemsRepository.update(id, updateItemDto);

      if (res.affected && res.affected <= 0)
        throw new NotFoundException('Item does not exist');

      /** Check if GP price was also updated */
      if (updateItemDto.gp_price) {
        /**issue Adi ka na, tim gusto kay pag update mo hin drop, ma update it weekly gp ngan total gp attendance */
        const { gp_price } = updateItemDto;
        const newItemGP = gp_price;
        const itemId = id;

        const attendance_items = await Attendance_Item.find({ itemId });

        attendance_items.map(async attendance_item => {
          const { attendanceId, qty, gp_price } = attendance_item;
          const oldItemGP = gp_price;
          const attendance = await Attendance.findOne(attendanceId, {
            relations: ['guild'],
          });
          if (!attendance)
            throw new NotFoundException('Attendance does not exist');

          const oldItemPrice = qty * oldItemGP;
          const newItemPrice = qty * newItemGP;

          attendance.gp_total -= oldItemPrice;
          attendance.gp_total += newItemPrice;

          attendance.guild.weeklyGP -= oldItemPrice;
          attendance.guild.weeklyGP += newItemPrice;

          await Attendance.save(attendance);
        });

        await Attendance_Item.update({ itemId }, { gp_price });
      }

      return {
        message: 'Item updated successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        'Something went wrong in updating the item. Please try again',
      );
    }
  }
  async deleteItem(id: number): Promise<any> {
    const attendance_items = await Attendance_Item.find({
      where: { itemId: id },
    });

    attendance_items.map(async attendance_item => {
      const { attendanceId, qty, gp_price } = attendance_item;
      const attendance = await Attendance.findOne(attendanceId, {
        relations: ['guild'],
      });
      if (!attendance) throw new NotFoundException('Attendance does not exist');
      const totalItemPrice: number = qty * gp_price;
      attendance.gp_total -= totalItemPrice;
      attendance.guild.weeklyGP -= totalItemPrice;
      await Attendance.save(attendance);
    });

    const res = await this.itemsRepository.delete(id);
    if (res.affected && res.affected <= 0)
      throw new NotFoundException('Item does not exist');

    return {
      message: 'Item deleted successfully',
    };
  }
}
