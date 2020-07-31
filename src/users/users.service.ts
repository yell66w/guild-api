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
import { ManageUserPointsDto } from './dto/manage-user-points.dto copy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return await this.usersRepository.getUsers(filterDto);
  }
  async getCurrentUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    user.password = undefined;
    user.salt = undefined;
    return user;
  }
  async getOne(id: number): Promise<User> {
    const found = await this.usersRepository.findOne(id);
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.getOne(id);
    const { role, status } = updateUserDto;
    if (role) user.role = role;
    if (status) user.status = status;

    user = await this.usersRepository.save(user);
    user.password = undefined;
    user.salt = undefined;
    return user;
  }
  async updatePoints(
    id: number,
    manageUserPointsDto: ManageUserPointsDto,
  ): Promise<User> {
    let user = await this.getOne(id);
    const { ap, gp } = manageUserPointsDto;
    if (ap) user.ap = ap;
    if (gp) user.gp = gp;

    user = await this.usersRepository.save(user);
    user.password = undefined;
    user.salt = undefined;
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected <= 0)
      throw new NotFoundException('User does not exist');
  }
}
