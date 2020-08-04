import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Mark } from '../marks.categories';

@Injectable()
export class RecordValidationPipe implements PipeTransform {
  readonly allowedMarks = [Mark.ONTIME, Mark.LATE, Mark.EXTRA];
  transform(value: any) {
    let { mark } = value;
    if (mark) {
      mark = mark.toUpperCase();
      if (!this.isMarkValid(mark)) {
        throw new BadRequestException('Invalid Mark');
      }
      value.mark = mark;
    }
    return value;
  }

  private isMarkValid(mark: any) {
    const idx = this.allowedMarks.indexOf(mark);
    return idx !== -1;
  }
}
