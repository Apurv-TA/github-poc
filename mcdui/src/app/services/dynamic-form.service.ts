import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(private formBuilder: FormBuilder) { }

  createLowerBond(): FormGroup {
    return this.formBuilder.group({
      lower_bound_name: '',
      lower_bound_percentage: ''
    })
  }

  createMaxOffers(): FormGroup {
    return this.formBuilder.group({
      product_item: '',
      max_offer: '',
      product_name: ""
    })
  }
  createDayPart(): FormGroup {
    return this.formBuilder.group({
      dayPart_item: '',
      dayPart_offer: '',
      dayPart_name: ""
    })
  }

  addDefaultLowerBond() {
    let lowerBond: any = [];
    let defaultLowerBond: any = {};
    defaultLowerBond.lower_bound_name = "";
    defaultLowerBond.lower_bound_percentage = "";
    lowerBond.push(defaultLowerBond)
    return lowerBond;
  }

  addDefaultDayPart() {
    let dayPart: any = [];
    let defaultDayPart: any = {};
    defaultDayPart.dayPart_name = "";
    defaultDayPart.dayPart_count = "";
    dayPart.push(defaultDayPart)
    return dayPart;
  }

  addDefaultMaxOffers() {
    let maxOffer: any = [];
    let defaultMaxOffer: any = {};
    defaultMaxOffer.product_item = "";
    defaultMaxOffer.max_offer = "";
    defaultMaxOffer.product_name = "";
    maxOffer.push(defaultMaxOffer)
    return maxOffer;
  }

  createCompetitionDiscounts() {
    return this.formBuilder.group({
      competition_brand_id: '',
      competition_brand_name: '',
      competition_offer_id: '',
      competition_offer_name: '',
      discount_depth: '',
    })
  }


  addCompetitionDiscounts() {
    let competition_discounts: any = [];
    let discounts: any = {};
    discounts.competition_brand_id = "";
    discounts.competition_brand_name = "";
    discounts.competition_offer_id = "";
    discounts.competition_offer_name = "";
    discounts.discount_depth = "";
    competition_discounts.push(discounts)
    return competition_discounts;
  }

  createImpactIndex(): FormGroup {
    return this.formBuilder.group({
      segment_name: '',
      gc: ["", Validators.required],
      net_sales: ["", Validators.required],
      margin: ["", Validators.required],
      segment_code: "",
      segment_default_weights_id: "",
      is_validform: false
    })
  }


}



