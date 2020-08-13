import { Repository, EntityRepository } from 'typeorm';
import { Attendance } from './attendances.entity';
import { GetAttendanceFilterDto } from './dto/get-attendance-filter.dto';

@EntityRepository(Attendance)
export class AttendancesRepository extends Repository<Attendance> {
  async getAttendances(filterDto: GetAttendanceFilterDto) {
    const { status, limit, search } = filterDto;
    const query = this.createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.participants', 'attendance.items')
      .orderBy('attendance.createdAt', 'DESC');

    if (search) {
      query.andWhere('LOWER(attendance.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    if (status) {
      query.andWhere('attendance.status =:status', {
        status,
      });
    }
    if (limit) {
      query.limit(limit);
    }
    return await query.getMany();
  }
}
