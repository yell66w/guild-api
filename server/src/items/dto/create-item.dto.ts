import { IsNotEmpty, IsString, IsNumber, Min, IsInt } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  gp_price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Min(0)
  qty: number;
}
