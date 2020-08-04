import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserRole, UserStatus } from '../users.categories';

@Injectable()
export class UserUpdateValidationPipe implements PipeTransform {
  readonly allowedRoles = [UserRole.MEMBER, UserRole.ADMIN, UserRole.OFFICER];
  readonly allowedStatuses = [UserStatus.APPROVED, UserStatus.PENDING];
  transform(value: any) {
    let { role, status } = value;
    if (role) {
      role = role.toUpperCase();
      if (!this.isRoleValid(role)) {
        throw new BadRequestException('Invalid Role');
      }
      value.role = role;
    }
    if (status) {
      status = status.toUpperCase();
      if (!this.isStatusValid(status)) {
        throw new BadRequestException('Invalid Status');
      }
      value.status = status;
    }

    return value;
  }

  private isRoleValid(role: any) {
    const idx = this.allowedRoles.indexOf(role);
    return idx !== -1;
  }
  private isStatusValid(value: any) {
    const idx = this.allowedStatuses.indexOf(value);
    return idx !== -1;
  }
}
