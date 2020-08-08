import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { Attendance } from '../attendances/attendances.entity';
import { Item } from '../items/items.entity';

@Entity()
export class Attendance_Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(
    () => Item,
    item => item.attendances,
    { cascade: true, onDelete: 'CASCADE' },
  )
  public item: Item;

  @Column('uuid')
  itemId: number;

  @ManyToOne(
    () => Attendance,
    attendance => attendance.items,
    { cascade: true, onDelete: 'CASCADE' },
  )
  public attendance: Attendance;

  @Column('uuid')
  attendanceId: number;

  @Column('int')
  qty: number;

  @Column('double precision', { default: 0 })
  gp_price: number;
}
