import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SendGPSDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}
