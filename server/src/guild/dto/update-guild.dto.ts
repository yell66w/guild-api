import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateGuildDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  oldName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;
}
