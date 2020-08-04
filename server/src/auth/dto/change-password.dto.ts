import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'password is required' })
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  oldPassword: string;

  @IsNotEmpty({ message: 'password is required' })
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  newPassword: string;

  @IsNotEmpty({ message: 'password is required' })
  @Length(6, 30, {
    message:
      'The password must be at least 6 but not longer than 30 characters',
  })
  confirmNewPassword: string;
}
