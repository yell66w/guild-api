import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attendance } from 'src/attendances/attendances.entity';
@Entity()
export class Guild extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column('double precision', { default: () => 0 })
  weeklyAP!: number;

  @Column('double precision', { default: () => 0 })
  weeklyGP!: number;

  @Column('double precision', { default: () => 0 })
  totalGP!: number;

  @Column('double precision', { default: () => 0 })
  taxRate!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => Attendance,
    attendance => attendance.guild,
  )
  public attendances!: Attendance[];
}
