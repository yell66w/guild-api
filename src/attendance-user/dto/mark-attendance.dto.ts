import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MarkAttendanceDto {
  @IsNotEmpty()
  @IsString()
  mark: string;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;
}
