import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;
}
