import { Repository, EntityRepository } from 'typeorm';
import { Attendance_Item } from './attendance_item.entity';

@EntityRepository(Attendance_Item)
export class Attendance_Item_Repository extends Repository<Attendance_Item> {}
