import { Pipe, PipeTransform } from '@angular/core';
import { ConstantService } from '../../services/constant.service';
/*
 *  Trim Sentence
*/
@Pipe({ name: 'numbersdisplay' })
export class NumbersDisplayPipe implements PipeTransform {
    constructor(public constantService: ConstantService) {}
    transform(value: any): any {
        // let x=value.toString();
        // let y=x.split(".");
        // if(y[0].length > 3){
            
        // }
        // x=y[0]+y[1];
        // return x;
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}