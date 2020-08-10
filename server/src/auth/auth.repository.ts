import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../users/users.entity';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { Transaction } from '../users/transactions.entity';
import { MarkAttendanceDto } from '../attendance-user/dto/mark-attendance.dto';
import { Attendance_User } from '../attendance-user/attendance_user.entity';
import { Attendance } from '../attendances/attendances.entity';
import { AttendancesStatus } from 'src/attendances/attendances.categories';
import {
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ActivityCategory } from 'src/activities/activities.categories';
@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(credentials: AuthSignUpCredentialsDto): Promise<any> {
    const { password } = credentials;
    delete credentials.confirmPassword;
    credentials.salt = await bcrypt.genSalt();
    credentials.password = await bcrypt.hash(password, credentials.salt);
    await this.save(credentials);
  }
  /** Send GPS from auth to another user */
  async sendGPS(user: User, receiver: User, amount: number) {
    receiver.gp += amount;
    user.gp -= amount;
    await this.save(user);
    await this.save(receiver);

    const transaction = new Transaction();
    transaction.user = user;
    transaction.amount = amount;
    transaction.receiverId = receiver.id;
    await getConnection().manager.save(transaction);
    return {
      message: `Successfully sent ${amount} GPS to ${receiver.IGN}. Remaining balance:${user.gp}`,
    };
  }
  /** issue -  refactor to subscriber */
  async markAttendance(
    userId: number,
    attendanceId: number,
    markAttendanceDto: MarkAttendanceDto,
  ): Promise<any> {
    const { mark } = markAttendanceDto;

    /** Find attendance */
    const attendance = await Attendance.findOne(attendanceId, {
      relations: ['activityPoint', 'guild'],
    });

    /** Check if attendance is legit */
    if (!attendance) throw new NotFoundException('Attendance does not exist');

    /** Check if the attendance is still open */
    if (attendance.status !== AttendancesStatus.OPEN) {
      throw new UnauthorizedException('Too late! Attendance is already closed');
    }

    /** Get authenticated user */
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User does not exist');

    /** Check if Attendance & User relationship already exists */
    const AUrecord = await Attendance_User.findOne({
      attendanceId,
      userId,
    });
    /** Proceed here if there is no relationship (mark) */
    if (!AUrecord) {
      /** Compute Percentage based on Mark (Ontime,Late,Extra) */
      let percentage: number = this.computeMarkPercentage(mark);
      try {
        /** Save Attendance & User relationship */
        const record = await Attendance_User.create({
          attendanceId,
          userId,
          percentage,
          mark,
        }).save();

        /** Computes overall contribution (ActivityPoint*Percentage) */
        const overallContribution: number =
          attendance.activityPoint.ap * record.percentage;

        /** Add overall contribution to attendance's total ap */
        attendance.ap_total += overallContribution;

        /** (PAYDAY ONLY) */
        if (attendance.category === ActivityCategory.PAYDAY) {
          /** Add overall contribution to player ap */
          user.ap += overallContribution;
          /** Add overall contribution to guild's weekly ap  */
          attendance.guild.weeklyAP += overallContribution;
        }

        /** Save Attendance & User*/
        await Attendance.save(attendance);
        await this.save(user);

        /** Return Object */
        return {
          message: 'marked',
          received: overallContribution,
          current_ap: user.ap,
        };
      } catch (error) {
        return error.message;
      }
    } else {
      /** Proceed here if there is already a relationship (unmark) */

      /** Delete Attendance & User relationship */
      await Attendance_User.delete(AUrecord.id);

      /** Compute overall contribution */
      const overallContribution: number =
        attendance.activityPoint.ap * AUrecord.percentage;

      /** Remove overall contribution from attendance's total ap */
      attendance.ap_total -= overallContribution;

      /** (PAYDAY ONLY) */
      if (attendance.category === ActivityCategory.PAYDAY) {
        /** Remove overall contribution from guild's weekly ap */
        attendance.guild.weeklyAP -= overallContribution;
        /** Remove overall contribution from player's ap */
        user.ap -= overallContribution;
      }

      try {
        /** Save Attendance & User */
        await Attendance.save(attendance);
        await this.save(user);

        /** Return object */
        return {
          message: 'unmarked',
          taken: overallContribution,
          current_ap: user.ap,
        };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  }
  /** Returns Percentage based on Mark  */
  private computeMarkPercentage(mark: string) {
    switch (mark) {
      case 'ONTIME':
        return 1;
      case 'LATE':
        return 0.5;
      default:
        return 1;
    }
  }
}
