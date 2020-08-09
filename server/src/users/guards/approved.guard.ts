import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';

@Injectable()
export class ApprovedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.status === 'APPROVED' ? true : false;
  }
}
