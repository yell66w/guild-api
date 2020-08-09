import { IsNotEmpty, IsNumber, Min, IsPositive } from 'class-validator';

export class SendGPSDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @IsPositive()
  amount!: number;
}
