import { Pipe, PipeTransform } from '@angular/core';
import { ConstantService } from '../../services/constant.service';
/*
 *  Currency format
*/
@Pipe({ name: 'currencyformat' })
export class CurrencyFormat implements PipeTransform {
    constructor(public constantService: ConstantService) {}
    transform(value: any): any {
        let price: any = value;
        let config:any = {};
        if (this.constantService.getConfiguration()) {
            config = this.constantService.getConfiguration();
        }
        if ( value != "-" && value != "" && value != null) {
            price = new Intl.NumberFormat(config.region).format(Number(value));
            if (price.includes('.')) {
                if(price < 0.0){
                    return new Intl.NumberFormat(config.region, {
                        maximumFractionDigits: config.price_decimal
                    }).format(Number(value));
                }else{
                    return new Intl.NumberFormat(config.region, {
                        maximumFractionDigits: config.price_decimal
                    }).format(Number(value));
                }
            } else {
                return new Intl.NumberFormat('en').format(Number(value));
            }
        }else{
            return price;
        }
    }
}