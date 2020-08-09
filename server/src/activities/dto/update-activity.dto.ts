import { IsNotEmpty, Length, IsString, IsOptional } from 'class-validator';
import { ActivityCategory } from '../activities.categories';

export class UpdateActivityDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, {
    message: 'The name must be at least 3 but not longer than 30 characters',
  })
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: ActivityCategory;
}
