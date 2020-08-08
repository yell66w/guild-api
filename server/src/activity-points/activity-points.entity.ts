import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Activity } from '../activities/activities.entity';
import { Attendance } from 'src/attendances/attendances.entity';
@Entity()
export class ActivityPoint {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  ap: number;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @ManyToOne(
    () => Activity,
    activity => activity.activityPoints,
    { cascade: true, onDelete: 'CASCADE' },
  )
  activity: Activity;

  @OneToMany(
    () => Attendance,
    attendance => attendance.activityPoint,
    { cascade: true, onDelete: 'CASCADE' },
  )
  attendances: Attendance[];
}
