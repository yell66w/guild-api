import { Repository, EntityRepository } from 'typeorm';
import { Item } from './items.entity';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';

@EntityRepository(Item)
export class ItemsReposityory extends Repository<Item> {
  async getItems(filterDto: GetItemsFilterDto) {
    const { search, type } = filterDto;

    const query = this.createQueryBuilder('item');

    if (type) {
      query.andWhere('item.type =:type', {
        type,
      });
    }

    if (search) {
      query.andWhere('LOWER(item.name) LIKE LOWER(:search) ', {
        search: `%${search}%`,
      });
    }
    return await query.getMany();
  }
}
