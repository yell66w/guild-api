import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
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
    return await this.usersRepository.getOne(id);
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async updateUsers(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.updateUser(id, updateUserDto);
    return await this.getOne(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.getOne(id);
    await this.usersRepository.delete(id);
  }
}
