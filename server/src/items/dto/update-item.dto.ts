import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsIn,
  IsInt,
} from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  gp_price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  qty: number;
}
