import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/users.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendancesService } from './attendances.service';
import { Attendance } from './attendances.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AttendanceValidationPipe } from './pipe/attendance-validation.pipe';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@UseGuards(new JwtAuthGuard())
@Controller('attendances')
export class AttendancesController {
  constructor(private attendancesService: AttendancesService) {}
  @Get()
  getAttendance(): Promise<Attendance[]> {
    return this.attendancesService.getAttendances();
  }
  @Get(':id/participants')
  getParticipants(@Param('id', ParseUUIDPipe) id: number): Promise<any> {
    return this.attendancesService.getParticipants(id);
  }
  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: number): Promise<Attendance> {
    return this.attendancesService.getOne(id);
  }

  @Post()
  createAttendance(
    @GetUser() user: User,
    @Body(AttendanceValidationPipe) createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendancesService.createAttendance(
      user.IGN,
      createAttendanceDto,
    );
  }

  @Put(':id')
  updateAttendance(
    @Param('id', ParseUUIDPipe) id: number,
    @Body(AttendanceValidationPipe) updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    return this.attendancesService.updateAttendance(id, updateAttendanceDto);
  }

  @Delete(':id')
  deleteAttendance(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    return this.attendancesService.deleteAttendance(id);
  }
}
