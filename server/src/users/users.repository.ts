import { Repository, EntityRepository } from 'typeorm';
import { User } from './users.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto) {
    const { search } = filterDto;
    const query = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.records',
      'attendance_user',
    );

    if (search) {
      query.andWhere('user.IGN LIKE :search OR user.username LIKE :search', {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
