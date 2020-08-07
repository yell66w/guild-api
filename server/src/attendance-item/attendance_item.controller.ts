import {
  Controller,
  UseGuards,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { Attendance_Item_Service } from './attendances_item.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Attendance_Item } from './attendance_item.entity';
import { AddDropDto } from './dto/addDrop.dto';
import { UpdateDropDto } from './dto/updateDrop';

@UseGuards(new JwtAuthGuard())
@Controller('attendances/drops')
export class Attendance_Item_Controller {
  constructor(private attendance_item_service: Attendance_Item_Service) {}

  @Post()
  addDropToAttendance(
    @Body() addDropDto: AddDropDto,
  ): Promise<Attendance_Item> {
    return this.attendance_item_service.addDrop(addDropDto);
  }

  @Put(':id')
  updateDropFromAttendance(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateDropDto: UpdateDropDto,
  ): Promise<Attendance_Item> {
    return this.attendance_item_service.updateDrop(id, updateDropDto);
  }

  @Delete(':id')
  deleteDropFromAttendance(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<boolean> {
    return this.attendance_item_service.deleteDrop(id);
  }
}
