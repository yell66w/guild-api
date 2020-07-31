import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsString,
  Length,
  IsNumber,
} from 'class-validator';

export class UpdateAttendanceDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  remarks: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  ap_worth: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  result: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status: string;
}
