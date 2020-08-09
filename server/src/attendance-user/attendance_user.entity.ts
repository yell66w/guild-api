import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Attendance } from '../attendances/attendances.entity';

@Entity()
export class Attendance_User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ManyToOne(
    () => User,
    user => user.records,
    { cascade: true, onDelete: 'CASCADE' },
  )
  public user!: User;

  @Column('uuid')
  userId!: number;

  @Column('uuid')
  attendanceId!: number;

  @ManyToOne(
    () => Attendance,
    attendance => attendance.participants,
    { cascade: true, onDelete: 'CASCADE' },
  )
  public attendance!: Attendance;

  @Column()
  mark!: string;

  @Column('double precision')
  percentage!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
