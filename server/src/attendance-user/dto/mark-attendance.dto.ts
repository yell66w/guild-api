import { IsNotEmpty, IsString } from 'class-validator';

export class MarkAttendanceDto {
  @IsNotEmpty()
  @IsString()
  mark!: string;
}
