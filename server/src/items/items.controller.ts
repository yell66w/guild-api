import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemTypeValidationPipe } from './pipe/item-type-validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../users/decorators/get-user.decorator';
import { User } from '../users/users.entity';
import { UpdateItemDto } from './dto/update-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';

@Controller('items')
@UseGuards(new JwtAuthGuard())
export class ItemsController {
  constructor(private itemsService: ItemsService) {}
  @Get()
  getItems(
    @Query(ItemTypeValidationPipe) filterDto: GetItemsFilterDto,
  ): Promise<Item[]> {
    return this.itemsService.getItems(filterDto);
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: number): Promise<Item> {
    return this.itemsService.getOne(id);
  }
  @Post()
  createItem(
    @GetUser() user: User,
    @Body(ItemTypeValidationPipe) createItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.createItem(user.IGN, createItemDto);
  }
  @Put(':id')
  updateItem(
    @Param('id', ParseUUIDPipe) id: number,
    @Body(ItemTypeValidationPipe) updateItemDto: UpdateItemDto,
  ): Promise<any> {
    return this.itemsService.updateItem(id, updateItemDto);
  }
  @Delete(':id')
  deleteItem(@Param('id', ParseUUIDPipe) id: number): Promise<any> {
    return this.itemsService.deleteItem(id);
  }
}
