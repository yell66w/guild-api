import { IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30, {
    message: 'The name must be at least 3 but not longer than 30 characters',
  })
  name!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;
}
