import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  Column,
} from 'typeorm';
import { Attendance } from 'src/attendances/attendances.entity';
import { Item } from 'src/items/items.entity';

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

  @Column('uuid')
  attendanceId: number;

  @ManyToOne(
    () => Attendance,
    attendance => attendance.items,
    { cascade: true, onDelete: 'CASCADE' },
  )
  public attendance: Attendance;

  @Column()
  qty: number;
}
