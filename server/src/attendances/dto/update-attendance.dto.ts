import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Drop } from './drop.dto';

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

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Drop)
  items: Drop[];
}
