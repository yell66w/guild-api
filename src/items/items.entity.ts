import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ItemType } from './items.categories';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('double precision', { default: () => 0 })
  ap_worth: number;

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
}
