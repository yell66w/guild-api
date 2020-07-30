import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return await this.usersRepository.getUsers(filterDto);
  }

  async getOne(id: number): Promise<User> {
    const found = await this.usersRepository.findOne(id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  async updateUsers(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.usersRepository.update(id, updateUserDto);
      return await this.getOne(id);
    } catch (error) {
      throw new ConflictException('Cant Update User');
    }
  }

  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
