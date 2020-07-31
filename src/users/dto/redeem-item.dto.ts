import { IsNotEmpty, IsUUID, IsIn, IsNumber, Min } from 'class-validator';

export class RedeemItemDto {
  @IsNotEmpty()
  @IsUUID()
  userId: number;

  @IsNotEmpty()
  @IsUUID()
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty: number;
}
