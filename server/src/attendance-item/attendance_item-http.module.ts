import { Module } from '@nestjs/common';
import { Attendance_Item_Module } from './attendance_item.module';
import { Attendance_Item_Service } from './attendances_item.service';
import { Attendance_Item_Controller } from './attendance_item.controller';

@Module({
  imports: [Attendance_Item_Module],
  providers: [Attendance_Item_Service],
  controllers: [Attendance_Item_Controller],
  exports: [Attendance_Item_Service],
})
export class AttendanceItemHttpModule {}
