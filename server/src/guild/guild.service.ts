import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildRepository } from './guild.repository';
import { Guild } from './guild.entity';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UpdateGuildDto } from './dto/update-guild.dto';
import { Attendance } from 'src/attendances/attendances.entity';
import { AttendancesStatus } from 'src/attendances/attendances.categories';
import { Not, MoreThan } from 'typeorm';
import { User } from 'src/users/users.entity';
import { PaydayDto } from './dto/payday.dto';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(GuildRepository) private guildRepository: GuildRepository,
  ) {}

  async one(id: number): Promise<Guild> {
    return await this.guildRepository.findOne(id, {
      relations: ['attendances'],
    });
  }

  async create(data: CreateGuildDto): Promise<Guild> {
    try {
      return await this.guildRepository.save(data);
    } catch (error) {
      throw new BadRequestException('Guild name already exist');
    }
  }
  async update(data: UpdateGuildDto): Promise<boolean> {
    const { oldName, name } = data;
    const res = await this.guildRepository.update({ name: oldName }, { name });
    return res.affected > 0 ? true : false;
  }
  async payday(data: PaydayDto): Promise<any> {
    const { taxRate } = data;

    /** Compute player and guild tax rate based on given tax rate */
    const playertaxRate = (100 - taxRate) / 100;
    const guildTaxRate = taxRate / 100;

    const guild = await this.guildRepository.findOne({ name: 'Bank' });
    const players = await User.find({ where: { ap: MoreThan(0) } });

    /** Update player GP based on contribution,weekly GP and tax rate */
    let { weeklyAP, weeklyGP, totalGP } = guild;
    players.map(async player => {
      const contributionAP = player.ap / weeklyAP;
      const gp = player.gp + weeklyGP * contributionAP * playertaxRate;
      const ap = 0;
      await User.update(player.id, { gp, ap });
    });

    /** Update guild GP based on weekly gp and tax rate */
    totalGP += weeklyGP * guildTaxRate;
    await this.guildRepository.update(guild.id, {
      weeklyAP: 0,
      weeklyGP: 0,
      taxRate,
      totalGP,
      attendances: [],
    });

    /** Update all attendance and set everything to paid */
    await Attendance.update(
      { status: Not(AttendancesStatus.PAID) },
      { status: AttendancesStatus.PAID },
    );

    return await User.find();
  }

  async getWeeklyGP(): Promise<number> {
    const attendances = await Attendance.find({
      select: ['gp_total'],
      where: { status: Not(AttendancesStatus.PAID) },
    });
    let weeklyGP = 0;
    attendances.map(attendance => {
      weeklyGP += attendance.gp_total;
    });
    return weeklyGP;
  }

  async getWeeklyAP(): Promise<number> {
    const attendances = await Attendance.find({
      select: ['ap_total'],
      where: { status: Not(AttendancesStatus.PAID) },
    });
    let weeklyAP = 0;
    attendances.map(attendance => {
      weeklyAP += attendance.ap_total;
    });
    return weeklyAP;
  }
}
