import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  AttendancesStatus,
  AttendanceResults,
} from '../attendances.categories';

@Injectable()
export class AttendanceValidationPipe implements PipeTransform {
  readonly allowedStatuses = [AttendancesStatus.OPEN, AttendancesStatus.CLOSED];
  readonly allowedResults = [AttendanceResults.WON, AttendanceResults.LOST];
  transform(value: any) {
    let { status, result } = value;
    if (status) {
      status = status.toUpperCase();
      if (!this.isStatusValid(status)) {
        throw new BadRequestException('Invalid Status');
      }
      value.status = status;
    }
    if (result) {
      result = result.toUpperCase();
      if (!this.isResultValid(result)) {
        throw new BadRequestException('Invalid Result');
      }
      value.result = result;
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
  private isResultValid(result: any) {
    const idx = this.allowedResults.indexOf(result);
    return idx !== -1;
  }
}
