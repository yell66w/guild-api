import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ActivityCategory } from '../activities.categories';

@Injectable()
export class CreateActivityValidationPipe implements PipeTransform {
  readonly allowedCategories = [
    ActivityCategory.DEFAULT,
    ActivityCategory.PAYDAY,
  ];
  transform(value: any) {
    let { category } = value;
    if (category) {
      category = category.toUpperCase();
      if (!this.isCategoryValid(category)) {
        throw new BadRequestException('Invalid Category');
      }
      value.category = category;
    }

    return value;
  }

  private isCategoryValid(category: any) {
    const idx = this.allowedCategories.indexOf(category);
    return idx !== -1;
  }
}
