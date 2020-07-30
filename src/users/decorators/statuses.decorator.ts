import { SetMetadata } from '@nestjs/common';

export const Statuses = (...statuses: string[]) =>
  SetMetadata('statuses', statuses);
