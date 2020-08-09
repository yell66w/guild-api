import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  Repository,
} from 'typeorm';
import { ActivityPoint } from './activity-points.entity';
import { Attendance } from 'src/attendances/attendances.entity';
import { Mark } from 'src/attendance-user/marks.categories';
import { User } from 'src/users/users.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class PostSubscriber
  implements EntitySubscriberInterface<ActivityPoint> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return ActivityPoint;
  }

  /**
   * Called after update.
   */
  async afterUpdate(event: UpdateEvent<ActivityPoint>): Promise<any> {
    /**issue try to refactor maybe add ap_worth to AU Record */
    Logger.log(`Activity Point was updated`, 'ActivityPointSubscriber');

    const apGotUpdated = event.updatedColumns.find(
      value => value.propertyName,
      ActivityPoint.prototype.ap,
    );
    if (apGotUpdated) {
      if (Number(event.databaseEntity.ap) !== event.entity.ap) {
        const attendanceRepository: Repository<Attendance> = event.connection.getRepository(
          'attendance',
        );
        const userRepository: Repository<User> = event.connection.getRepository(
          'user',
        );

        const activityPointId: number = event.entity.id;

        /** Old AP */
        const oldAP: number = event.databaseEntity.ap;
        /** New AP */
        const newAP: number = event.entity.ap;
        /** AP To be added */
        const modAP: number = newAP - oldAP;
        Logger.log(
          `Activity Point Updated from ${oldAP}AP to ${newAP}AP`,
          'ActivityPoint',
        );

        const attendances = await attendanceRepository.find({
          where: { activityPointId },
          relations: ['participants', 'participants.user', 'guild'],
        });

        attendances.map(async attendance => {
          const oldAttendanceAP: number = attendance.ap_total;
          const oldGuildAP: number = attendance.guild.weeklyAP;
          attendance.participants.map(async participant => {
            const oldPlayerAP: number = participant.user.ap;
            if (participant.mark === Mark.LATE) {
              participant.user.ap += modAP / 2;
              attendance.ap_total += modAP / 2;
              attendance.guild.weeklyAP += modAP / 2;
            } else {
              participant.user.ap += modAP;
              attendance.ap_total += modAP;
              attendance.guild.weeklyAP += modAP;
            }
            await userRepository.save(participant.user);
            Logger.warn(
              `${participant.user.IGN}'s AP is updated from ${oldPlayerAP} to ${participant.user.ap}`,
              'Player',
            );
          });

          await attendanceRepository.save(attendance);
          Logger.log(
            `${attendance.name}'s total AP is updated from ${oldAttendanceAP} to ${attendance.ap_total}`,
            'Attendance',
          );
          Logger.log(
            `${attendance.guild.name}'s WEEKLY AP is updated from ${oldGuildAP} to ${attendance.guild.weeklyAP}`,
            'Guild',
          );
        });
      }
    }
  }
  /** Issue afterRemove */
}
