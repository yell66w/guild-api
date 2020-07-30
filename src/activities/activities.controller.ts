import { Controller, Get } from '@nestjs/common';

@Controller('activities')
export class ActivitiesController {
  @Get()
  getActivities() {
    return 'hahaha';
  }
}
