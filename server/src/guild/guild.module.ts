import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildRepository } from './guild.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GuildRepository])],
  exports: [TypeOrmModule],
})
export class GuildModule {}
