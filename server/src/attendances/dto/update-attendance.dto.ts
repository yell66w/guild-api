import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  remarks: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  result: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  activityPointId: number;
}
