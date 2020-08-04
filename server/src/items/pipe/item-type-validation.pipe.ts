import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ItemType } from '../items.categories';

@Injectable()
export class ItemTypeValidationPipe implements PipeTransform {
  readonly allowedCategories = [ItemType.FARM, ItemType.DROP];
  transform(value: any) {
    let { type } = value;
    if (type) {
      type = type.toUpperCase();
      if (!this.isTypeValid(type)) {
        throw new BadRequestException('Invalid Type');
      }
      value.type = type;
    }

    return value;
  }

  private isTypeValid(type: any) {
    const idx = this.allowedCategories.indexOf(type);
    return idx !== -1;
  }
}
