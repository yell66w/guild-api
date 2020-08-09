import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column('uuid')
  receiverId!: number;

  @Column('double precision', { default: () => 0 })
  amount!: number;

  @ManyToOne(
    () => User,
    user => user.transactions,
    { cascade: true },
  )
  public user!: User;

  @Column('uuid')
  userId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
