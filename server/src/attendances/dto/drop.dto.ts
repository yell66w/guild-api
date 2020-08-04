import { IsNotEmpty, IsUUID, IsNumber, IsInt, Min } from 'class-validator';

export class Drop {
  @IsNotEmpty()
  @IsUUID()
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  qty: number;
}
