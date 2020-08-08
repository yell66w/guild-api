import { Repository, EntityRepository } from 'typeorm';
import { User } from './users.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto) {
    const { search, role, status } = filterDto;
    const query = this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.IGN',
        'user.username',
        'user.status',
        'user.role',
        'user.ap',
        'user.gp',
        'user.createdAt',
      ])
      .leftJoinAndSelect('user.records', 'attendance_user');

    if (search) {
      query.andWhere(
        'LOWER(user.IGN) LIKE LOWER(:search) OR LOWER(user.username) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (role) {
      query.andWhere('user.role = :role', {
        role,
      });
    }
    if (status) {
      query.andWhere('user.status =:status', {
        status,
      });
    }
    return await query.getMany();
  }
}
