import { Pipe, PipeTransform } from '@angular/core';
import { ConstantService } from '../../services/constant.service';
/*
 *  Trim Sentence
*/
@Pipe({ name: 'shorten' })
export class TrimPipe implements PipeTransform {
    constructor(public constantService: ConstantService) {}
    transform(value: any): any {
        if(value.length > 12){
            return value.substr(0,12);
        }
        return value;
    }
}