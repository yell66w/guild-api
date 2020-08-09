import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHttpModule } from './users/users-http.module';
import { AuthHttpModule } from './auth/auth-http.module';
import { ActivityHttpModule } from './activities/activities-http.module';
import { ActivityPointsHttpModule } from './activity-points/activity-points-http.module';
import { AttendancesHttpModule } from './attendances/attendances-http.module';
import { ItemsHttpModule } from './items/items-http.module';
import { AttendanceItemHttpModule } from './attendance-item/attendance_item-http.module';
import { GuildHttpModule } from './guild/guild-http.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserHttpModule,
    AuthHttpModule,
    ActivityHttpModule,
    ActivityPointsHttpModule,
    AttendancesHttpModule,
    ItemsHttpModule,
    AttendanceItemHttpModule,
    GuildHttpModule,
  ],
})
export class AppModule {}
