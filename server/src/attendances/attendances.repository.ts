import { Repository, EntityRepository } from 'typeorm';
import { Attendance } from './attendances.entity';
import { Item } from '../items/items.entity';
import { Attendance_Item } from '../attendance-item/attendance_item.entity';

@EntityRepository(Attendance)
export class AttendancesRepository extends Repository<Attendance> {}
