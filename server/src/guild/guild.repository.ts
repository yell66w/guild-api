import { Repository, EntityRepository } from 'typeorm';
import { Guild } from './guild.entity';

@EntityRepository(Guild)
export class GuildRepository extends Repository<Guild> {}
