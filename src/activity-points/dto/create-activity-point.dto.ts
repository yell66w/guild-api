import { IsNotEmpty, IsNumber, Min, IsUUID } from 'class-validator';

export class CreateActivityPointDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ap: number;

  @IsNotEmpty()
  @IsUUID()
  activityId: number;
}
