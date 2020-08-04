import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsString,
  Length,
  IsNumber,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { Drop } from './drop.dto';

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

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Drop)
  items: Drop[];
}
