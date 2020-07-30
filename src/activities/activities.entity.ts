import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ActivityCategory } from './activities.categories';
@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column('timestamp', { default: () => 'LOCALTIMESTAMP' })
  createdAt: Date;

  @Column({ default: ActivityCategory.DEFAULT })
  category: string;
}
