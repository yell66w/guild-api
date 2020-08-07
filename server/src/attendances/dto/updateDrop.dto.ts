import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateDropDto {
  @IsNotEmpty()
  @IsUUID()
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  qty: number;
}
