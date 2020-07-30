import { Repository, EntityRepository } from 'typeorm';
import { User } from './users.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUsers(filterDto: GetUsersFilterDto) {
    const { search } = filterDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere('user.IGN LIKE :search OR user.username LIKE :search', {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
