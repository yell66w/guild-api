import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Get('users/:id')
  getOne(@Param('id', ParseUUIDPipe) id: number): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Post('auth/register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @Put('users/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUsers(id, updateUserDto);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseUUIDPipe) id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
