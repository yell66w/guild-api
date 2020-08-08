import { Module } from '@nestjs/common';
import { GuildController } from './guild.controller';
import { GuildService } from './guild.service';
import { GuildModule } from './guild.module';

@Module({
  controllers: [GuildController],
  providers: [GuildService],
  imports: [GuildModule],
  exports: [GuildService],
})
export class GuildHttpModule {}
