import { IsNotEmpty, IsNumber, Min, IsUUID, IsOptional } from 'class-validator';

export class UpdateActivityPointDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ap: number;
}
