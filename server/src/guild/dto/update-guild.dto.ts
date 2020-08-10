import { IsNotEmpty, IsOptional, IsPositive, IsNumber } from 'class-validator';

export class UpdateGuildDto {
  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  totalGP?: number;
}
