import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Activity } from '../activities/activities.entity';
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
}
