import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsReposityory } from './items.repository';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsReposityory)
    private itemsRepository: ItemsReposityory,
  ) {}

  async getItems(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }
  async getOne(id: number): Promise<Item> {
    const found = await this.itemsRepository.findOne(id);
    if (!found) throw new NotFoundException('Item does not exist');

    return found;
  }

  async createItem(
    author: string,
    createItemDto: CreateItemDto,
  ): Promise<Item> {
    try {
      return await this.itemsRepository.save({ ...createItemDto, author });
    } catch (error) {
      if (error.code === '23505')
        throw new MethodNotAllowedException('Item already exist');
    }
  }

  async updateItem(id: number, updateItemDto: UpdateItemDto): Promise<any> {
    try {
      const res = await this.itemsRepository.update(id, updateItemDto);
      if (res.affected <= 0) throw new NotFoundException('Item does not exist');
      return {
        message: 'Item updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong in updating the item. Please try again',
      );
    }
  }
  async deleteItem(id: number): Promise<any> {
    const res = await this.itemsRepository.delete(id);
    if (res.affected <= 0) throw new NotFoundException('Item does not exist');
    return {
      message: 'Item deleted successfully',
    };
  }
}
