import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsUUID,
  IsEmpty,
} from 'class-validator';
import { ActivityCategory } from 'src/activities/activities.categories';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  remarks?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  result?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  activityPointId?: number;

  @IsEmpty()
  category?: ActivityCategory;

  @IsEmpty()
  name?: string;
}
