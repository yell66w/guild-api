import { Repository, EntityRepository } from 'typeorm';
import { ActivityPoint } from './activity-points.entity';

@EntityRepository(ActivityPoint)
export class ActivityPointsRepository extends Repository<ActivityPoint> {}
