import { IsNotEmpty, IsUUID, IsNumber, Min, Max } from 'class-validator';

export class DonateItemDto {
  @IsNotEmpty()
  @IsUUID()
  userId!: number;

  @IsNotEmpty()
  @IsUUID()
  itemId!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest!: number;
}
