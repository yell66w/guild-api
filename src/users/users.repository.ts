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
  async getOne(id: number): Promise<User> {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.getOne(id);
    try {
      await this.createQueryBuilder()
        .update(User)
        .set(updateUserDto)
        .where('id=:id', { id })
        .execute();
    } catch (error) {
      throw new ForbiddenException('IGN or username already taken');
    }
  }
}
