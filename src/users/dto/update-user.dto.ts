import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  role: string;

  @IsOptional()
  @IsNotEmpty()
  status: string;
}
