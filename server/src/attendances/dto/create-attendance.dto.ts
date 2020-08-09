import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsUUID()
  activityId!: number;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  remarks?: string;

  @IsNotEmpty()
  @IsString()
  result!: string;

  @IsNotEmpty()
  @IsUUID()
  activityPointId!: number;
}
