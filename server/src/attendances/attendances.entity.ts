import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Activity } from '../activities/activities.entity';
import { AttendancesStatus } from './attendances.categories';
import { Attendance_User } from '../attendance-user/attendance_user.entity';
import { Attendance_Item } from '../attendance-item/attendance_item.entity';
import { Guild } from 'src/guild/guild.entity';
import { ActivityCategory } from 'src/activities/activities.categories';
import { ActivityPoint } from 'src/activity-points/activity-points.entity';

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @Column('double precision', { default: () => 0 })
  ap_total: number;

  @Column('double precision', { default: () => 0 })
  gp_total: number;

  @Column({ nullable: true })
  remarks: string;

  @Column()
  author: string;

  @Column({
    type: 'enum',
    enum: AttendancesStatus,
    default: AttendancesStatus.OPEN,
  })
  status: string;

  @Column()
  result: string;

  @ManyToOne(
    () => Activity,
    activity => activity.attendances,
    { cascade: true, onDelete: 'CASCADE' },
  )
  activity: Activity;

  @OneToMany(
    () => Attendance_User,
    attendanceUser => attendanceUser.attendance,
  )
  public participants: Attendance_User[];

  @OneToMany(
    () => Attendance_Item,
    attendanceItem => attendanceItem.attendance,
  )
  public items: Attendance_Item[];

  @ManyToOne(
    () => Guild,
    guild => guild.attendances,
    { cascade: true, onDelete: 'CASCADE' },
  )
  guild: Guild;

  @Column({
    type: 'enum',
    enum: ActivityCategory,
    default: ActivityCategory.DEFAULT,
  })
  category: string;

  @ManyToOne(
    () => ActivityPoint,
    activityPoint => activityPoint.attendances,
  )
  activityPoint: ActivityPoint;

  @Column({ nullable: true })
  activityPointId: number;
}
