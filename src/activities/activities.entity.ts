import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { ActivityCategory } from './activities.categories';
import { ActivityPoint } from '../activity-points/activity-points.entity';
import { Attendance } from '../attendances/attendances.entity';
@Entity()
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ActivityCategory,
    default: ActivityCategory.DEFAULT,
  })
  category: string;

  @OneToMany(
    () => ActivityPoint,
    activityPoint => activityPoint.activity,
  )
  activityPoints: ActivityPoint[];

  @OneToMany(
    () => Attendance,
    attendance => attendance.activity,
  )
  attendances: Attendance[];
}
