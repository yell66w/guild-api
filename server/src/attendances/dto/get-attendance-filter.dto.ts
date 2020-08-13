import { IsOptional } from 'class-validator';
import { AttendancesStatus } from '../attendances.categories';

export class GetAttendanceFilterDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  status?: AttendancesStatus;

  @IsOptional()
  //issue = min(1) isInt
  limit?: number;
}
