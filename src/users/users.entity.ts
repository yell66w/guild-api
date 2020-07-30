import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus, UserRole } from './users.categories';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  IGN: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: () => 0 })
  ap: number;

  @Column({ default: () => 0 })
  gp: number;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @Column()
  salt: string;

  @Column({ default: UserStatus.PENDING })
  status: string;

  @Column({ default: UserRole.MEMBER })
  role: string;
}
