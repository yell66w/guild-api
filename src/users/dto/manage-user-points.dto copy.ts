import { IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class ManageUserPointsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  ap: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  gp: number;
}
