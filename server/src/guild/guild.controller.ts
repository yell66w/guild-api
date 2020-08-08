import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GuildService } from './guild.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApprovedGuard } from 'src/users/guards/approved.guard';
import { Attendance } from 'src/attendances/attendances.entity';
import { Guild } from './guild.entity';
import { CreateGuildDto } from './dto/create-guild.dto';
import { PaydayDto } from './dto/payday.dto';

@Controller('guild')
@UseGuards(new JwtAuthGuard(), new ApprovedGuard())
export class GuildController {
  constructor(private guildService: GuildService) {}

  @Get('/weekly-gp')
  getWeeklyGP(): Promise<number> {
    return this.guildService.getWeeklyGP();
  }
  @Get('/weekly-ap')
  getWeeklyAP(): Promise<number> {
    return this.guildService.getWeeklyAP();
  }
  @Get(':id')
  one(@Param('id', ParseUUIDPipe) id: number): Promise<Guild> {
    return this.guildService.one(id);
  }
  @Post()
  create(@Body() data: CreateGuildDto): Promise<Guild> {
    return this.guildService.create(data);
  }

  @Post('payday')
  payday(@Body() data: PaydayDto): Promise<any> {
    return this.guildService.payday(data);
  }
}
