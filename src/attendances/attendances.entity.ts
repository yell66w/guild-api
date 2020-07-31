import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Activity } from 'src/activities/activities.entity';
import { AttendancesStatus } from './attendances.categories';

@Entity()
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @Column('double precision', { default: () => 0 })
  ap_worth: number;

  @Column('double precision', { default: () => 0 })
  ap_total: number;

  @Column('double precision', { default: () => 0 })
  gp_total: number;

  @Column({ nullable: true })
  remarks: string;

  @Column()
  author: string;

  @Column({ default: AttendancesStatus.OPEN })
  status: string;

  @Column()
  result: string;

  @ManyToOne(
    () => Activity,
    activity => activity.attendances,
    { cascade: true, onDelete: 'CASCADE' },
  )
  activity: Activity;
}
