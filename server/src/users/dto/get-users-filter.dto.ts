import { IsOptional } from 'class-validator';
import { UserRole, UserStatus } from '../users.categories';

export class GetUsersFilterDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  role?: UserRole;

  @IsOptional()
  status?: UserStatus;
}
