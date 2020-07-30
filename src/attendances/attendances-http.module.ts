import { Module } from '@nestjs/common';
import { AttendancesModule } from './attendances.module';
import { AttendancesService } from './attendances.service';
import { AttendancesController } from './attendances.controller';

@Module({
  imports: [AttendancesModule],
  providers: [AttendancesService],
  controllers: [AttendancesController],
})
export class AttendancesHttpModule {}
