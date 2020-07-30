import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class StatusesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const statuses = this.reflector.get<string[]>(
      'statuses',
      context.getHandler(),
    );
    if (!statuses) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return statuses.includes(user.status);
  }
}
