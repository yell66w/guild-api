import { Repository, EntityRepository, getConnection } from 'typeorm';
import { User } from '../users/users.entity';
import { AuthSignUpCredentialsDto } from './dto/auth-signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'src/users/transactions.entity';
import { MarkAttendanceDto } from 'src/attendance-user/dto/mark-attendance.dto';
import { Attendance_User } from 'src/attendance-user/attendance_user.entity';
import { Attendance } from 'src/attendances/attendances.entity';
@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(credentials: AuthSignUpCredentialsDto): Promise<void> {
    const { password } = credentials;
    delete credentials.confirmPassword;
    credentials.salt = await bcrypt.genSalt();
    credentials.password = await bcrypt.hash(password, credentials.salt);
    await this.save(credentials);
  }

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

  async markAttendance(
    userId: number,
    attendanceId: number,
    markAttendanceDto: MarkAttendanceDto,
  ): Promise<any> {
    const { mark } = markAttendanceDto;
    const user = await this.findOne(userId);
    const attendance = await Attendance.findOne(attendanceId, {
      select: ['ap_worth'],
    });

    const result = await Attendance_User.delete({
      attendanceId,
      userId,
    });
    if (result.affected <= 0) {
      let percentage: number = this.computeMarkPercentage(mark);
      const record = await Attendance_User.create({
        attendanceId,
        userId,
        percentage,
        mark,
      }).save();
      user.ap += attendance.ap_worth * record.percentage;
      await this.save(user);

      return {
        message: 'marked',
        received: attendance.ap_worth,
        current_ap: user.ap,
      };
    } else {
      user.ap -= attendance.ap_worth;

      await this.save(user);
      return {
        message: 'unmarked',
        taken: attendance.ap_worth,
        current_ap: user.ap,
      };
    }
  }

  private computeMarkPercentage(mark: string) {
    switch (mark) {
      case 'ONTIME':
        return 1;
      case 'LATE':
        return 0.5;
      default:
        break;
    }
  }
}
