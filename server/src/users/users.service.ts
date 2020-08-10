import {
  Injectable,
  NotFoundException,
  MethodNotAllowedException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { ManageUserPointsDto } from './dto/manage-user-points.dto copy';
import { DonateItemDto } from './dto/donate-item.dto';
import { Item } from '../items/items.entity';
import { RedeemItemDto } from './dto/redeem-item.dto';
import { Guild } from 'src/guild/guild.entity';

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
    if (!user) throw new NotFoundException('User does not exist');
    //issue do not select password and salt
    // user.password = undefined;
    // user.salt = undefined;
    return user;
  }
  async getOne(id: number): Promise<User> {
    const found = await this.usersRepository.findOne(id, {
      select: [
        'id',
        'IGN',
        'username',
        'ap',
        'gp',
        'role',
        'status',
        'createdAt',
      ],
      relations: ['records'],
    });
    if (!found) throw new NotFoundException('User not found');
    return found;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.getOne(id);
    const { role, status } = updateUserDto;
    if (role) user.role = role;
    if (status) user.status = status;

    user = await this.usersRepository.save(user);
    //issue do not select password and salt
    // user.password = undefined;
    // user.salt = undefined;
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

    return await this.usersRepository.save(user);
    /**issue do not select password & salt */
  }
  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (!result.affected) throw new NotFoundException('User does not exist');
    if (result.affected && result.affected <= 0)
      throw new NotFoundException('User does not exist');
  }
  async donate(author: string, donateItemDto: DonateItemDto): Promise<any> {
    const { userId, itemId, qty, interest } = donateItemDto;

    const item = await Item.findOne(itemId);
    const user = await this.usersRepository.findOne(userId);
    const guild = await Guild.findOne({ name: 'Bank' });
    if (!guild) throw new NotFoundException('Guild does not exist!');
    if (item && user) {
      const totalItemGPPrice: number =
        (item.gp_price - item.gp_price * (interest / 100)) * qty; //issue - interest rate? formula? tax?
      item.qty += qty;
      user.gp += totalItemGPPrice;
      guild.totalGP -= totalItemGPPrice;
      await Item.save(item);
      await this.usersRepository.save(user);
      await Guild.save(guild);
      Logger.log(
        `The Guild bought x${qty} ${item.name} from ${user.IGN} with ${interest}% interest for a total of ${totalItemGPPrice}GP - verified by ${author} `,
        'UsersService',
      );
      return {
        message: 'Succesfully donated an item',
      };
    } else {
      throw new NotFoundException('Item or User does not exist');
    }
  }
  async redeem(author: string, redeemItemDto: RedeemItemDto): Promise<any> {
    const { userId, itemId, qty, discount } = redeemItemDto;

    const item = await Item.findOne(itemId);
    const user = await this.usersRepository.findOne(userId);
    const guild = await Guild.findOne({ name: 'Bank' });
    if (!item) throw new NotFoundException('Item does not exist');
    if (!user) throw new NotFoundException('User does not exist');
    if (!guild) throw new NotFoundException('Guild does not exist');

    const totalItemGPPrice: number =
      (item.gp_price - item.gp_price * (discount / 100)) * qty;
    if (item.qty <= 0) throw new MethodNotAllowedException('No items in stock');
    if (item.qty < qty)
      throw new MethodNotAllowedException('Not enough items in stock');
    if (user.gp < totalItemGPPrice)
      throw new MethodNotAllowedException('User has insufficient GP');
    if (item && user) {
      item.qty -= qty;
      user.gp -= totalItemGPPrice;
      guild.totalGP += totalItemGPPrice;
      await Item.save(item);
      await this.usersRepository.save(user);
      await Guild.save(guild);

      Logger.log(
        `${user.IGN} redeemed x${qty} ${item.name} with ${discount}% discount for a total of ${totalItemGPPrice}GP - verified by ${author} `,
        'UsersService',
      );
      return {
        message: 'Succesfully redeemed an item',
      };
    } else {
      throw new NotFoundException('Item or User does not exist');
    }
  }
}
