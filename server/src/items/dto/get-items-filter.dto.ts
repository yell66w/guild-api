import { IsOptional } from 'class-validator';
import { ItemType } from '../items.categories';

export class GetItemsFilterDto {
  @IsOptional()
  type?: ItemType;

  @IsOptional()
  search?: string;
}
