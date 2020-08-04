import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ItemType } from './items.categories';
import { Attendance_Item } from 'src/attendance-item/attendance_item.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('double precision', { default: () => 0 })
  gp_price: number;

  @Column({ default: () => 0 })
  qty: number;

  @Column()
  author: string;

  @Column({ type: 'enum', enum: ItemType })
  type: string;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @OneToMany(
    () => Attendance_Item,
    attendanceItem => attendanceItem.item,
  )
  public attendances: Attendance_Item[];
}
