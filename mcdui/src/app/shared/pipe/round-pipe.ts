import { Pipe, PipeTransform } from '@angular/core';
import { ConstantService } from '../../services/constant.service';
/*
 *  Round Value
*/
@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
    constructor(public constantService: ConstantService) {}
    transform(value: any): any {
        return Math.round(value);
    }
}