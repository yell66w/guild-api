import { Repository, EntityRepository } from 'typeorm';
import { Attendance } from './attendances.entity';

@EntityRepository(Attendance)
export class AttendancesRepository extends Repository<Attendance> {}
