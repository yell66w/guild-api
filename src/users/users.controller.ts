import {
  Controller,
  Get,
  Body,
  Query,
  Param,
  Put,
  ParseUUIDPipe,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { UserUpdateValidationPipe } from './pipes/user-update-validation.pipe';

@Controller('users')
@UseGuards(new JwtAuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('profile')
  getProfile(@GetUser() user: User): Promise<User> {
    return this.usersService.getCurrentUser(user.id);
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: number): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: number,
    @Body(UserUpdateValidationPipe)
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
