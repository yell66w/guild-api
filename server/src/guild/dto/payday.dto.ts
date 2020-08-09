import { IsNotEmpty, Min, Max, IsPositive } from 'class-validator';

export class PaydayDto {
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  @IsPositive()
  taxRate!: number;
}
