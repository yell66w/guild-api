import { IsNotEmpty, IsNumber, IsInt, Min, IsPositive } from 'class-validator';

export class UpdateDropDto {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @IsPositive()
  qty: number;
}
