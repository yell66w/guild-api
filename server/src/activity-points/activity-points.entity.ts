import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Activity } from '../activities/activities.entity';
import { Attendance } from 'src/attendances/attendances.entity';
@Entity()
export class ActivityPoint {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  name!: string;

  @Column('double precision')
  ap!: number;

  @CreateDateColumn() //issue implement this in all entities
  createdAt!: Date;

  @UpdateDateColumn() //issue implement this in all entities
  updatedAt!: Date;

  @ManyToOne(
    () => Activity,
    activity => activity.activityPoints,
    { cascade: true, onDelete: 'CASCADE' },
  )
  activity!: Activity;

  @OneToMany(
    () => Attendance,
    attendance => attendance.activityPoint,
    { cascade: true, onDelete: 'CASCADE' },
  )
  attendances!: Attendance[];
}
