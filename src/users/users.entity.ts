import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@Entity()
export class User extends BaseEntity {
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
}
