import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance_Item_Repository } from './attendance_item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance_Item_Repository])],
  exports: [TypeOrmModule],
})
export class Attendance_Item_Module {}
