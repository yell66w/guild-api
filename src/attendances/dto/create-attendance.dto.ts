import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsString,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsUUID()
  activityId: number;

  @IsOptional()
  @IsString()
  @Length(3, 30)
  remarks: string;

  @IsNotEmpty()
  @IsNumber()
  ap_worth: number;

  @IsNotEmpty()
  @IsString()
  result: string;
}
