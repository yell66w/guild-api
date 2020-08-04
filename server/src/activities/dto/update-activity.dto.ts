import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';

export class UpdateActivityDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, {
    message: 'The name must be at least 3 but not longer than 30 characters',
  })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category: string;
}
