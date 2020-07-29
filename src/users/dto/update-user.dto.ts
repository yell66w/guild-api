import { Length, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 30, {
    message: 'The IGN must be at least 3 but not longer than 30 characters',
  })
  IGN: string;
  @IsOptional()
  @Length(3, 30, {
    message:
      'The username must be at least 3 but not longer than 30 characters',
  })
  username: string;

  @IsOptional()
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  password: string;

  @IsOptional()
  @IsNumber()
  ap: number;

  @IsOptional()
  @IsNumber()
  gp: number;
}
