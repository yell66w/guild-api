import { Repository, EntityRepository } from 'typeorm';
import { Activity } from './activities.entity';

@EntityRepository(Activity)
export class ActivitiesRepository extends Repository<Activity> {}
