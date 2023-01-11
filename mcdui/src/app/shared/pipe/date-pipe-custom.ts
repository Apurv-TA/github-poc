import { ConstantService } from '../../services/constant.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'datePipeCustom',
})
export class DatePipeCustom implements PipeTransform {
  constructor(public constantService: ConstantService) { }
    transform(value: any) {
      let config:any = {};
      if (this.constantService.getConfiguration()) {
        config = this.constantService.getConfiguration();
      }
      let standard_value = new Date(value.replace(/-/g, "/")); // added for standard date in safari and chrom
      let datePipe = new DatePipe("en-US");
      let transform_value = datePipe.transform(standard_value, 'mediumDate');
      return transform_value;
    }
}