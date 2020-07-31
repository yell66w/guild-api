import { Repository, EntityRepository } from 'typeorm';
import { Item } from './items.entity';

@EntityRepository(Item)
export class ItemsReposityory extends Repository<Item> {}
