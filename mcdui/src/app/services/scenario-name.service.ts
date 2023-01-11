import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ScenarioNameService {

  public scenarioPlannerFlag = new BehaviorSubject<any>('');

  constructor(private http: HttpClient, public router: Router) { }
  api_url = `${ENV.serverUrl}`;

  // Behaviour Subject Getter and setter Starts
  getScenarioPlannerFlag(): Observable<any> {
    return this.scenarioPlannerFlag.asObservable();
  }

  setScenarioPlannerFlag(scenarioPlannerFlag: any) {
    this.scenarioPlannerFlag.next(scenarioPlannerFlag)
  }

  // Behaviour Subject Getter and setter Ends

  //Add Api's Below
  // getDiscountService() {
  //   let url = this.api_url + 'v1/offer_configuration/discounts';
  //   return this.http.get<Response[]>(`${url}`);
  // }

  // getAllSegments() {
  //   let url = this.api_url + 'v1/offer_configuration/all/segments';
  //   return this.http.get<Response[]>(`${url}`);
  // }
  getPromoTypeService(promoType: any, ohm_id: any, dis_mech_desc: any) {
    let url = this.api_url + 'v1/scenario_planner/productTypes?promo_type=' + promoType + '&ohm_id=' + ohm_id + '&dis_mech_desc=' + dis_mech_desc;
    return this.http.get<Response[]>(`${url}`);
  }
  getItemService(promoType: any, ohm_id: any, dis_mech_desc: any, productType: any) {
    let url = this.api_url + 'v1/scenario_planner/promoNames?promo_type=' + promoType + '&ohm_id=' + ohm_id + '&dis_mech_desc=' + dis_mech_desc + '&product_type=' + productType;
    return this.http.get<Response[]>(`${url}`);
  }
  getItemPriceService(promoType: any, ohm_id: any, dis_mech_desc: any, productType: any, offer_id: any) {
    let url = this.api_url + 'v1/scenario_planner/promoPrice?promo_type=' + promoType + '&ohm_id=' + ohm_id + '&dis_mech_desc=' + dis_mech_desc + '&product_type=' + productType + '&offer_id=' + offer_id;
    return this.http.get<Response[]>(`${url}`);
  }
  getMinPriceService(payload: any) {
    let url = this.api_url + 'v1/scenario_planner/minprice';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  // getBrandsService() {
  //   let url = this.api_url + 'v1/offer_configuration/brands';
  //   return this.http.get<Response[]>(`${url}`);
  // }
  getEditService(payload: any) {
    // let url = this.api_url + 'v1/scenario_planner/edit';
    let url = this.api_url + 'v1/scenario_planner/offerDetail?scenario_id=' + payload;
    // let url = this.api_url + 'v1/offer_configuration/offerDetail?scenario_id=36';
    return this.http.get<Response[]>(`${url}`);
  }
  getSaveService(payload: any) {
    let url = this.api_url + 'v1/scenario_planner/saveScenario';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  updateScenarioService(payload: any) {
    let url = this.api_url + 'v1/scenario_planner/saveScenario';
    return this.http.put<Response[]>(`${url}`, payload);
  }

  getAllItemService() {
    let url = this.api_url + 'v1/offer_configuration/item';
    return this.http.get<Response[]>(`${url}`);
  }
  getPromoMechService(ohm_id: any, promoTypeSelected: any) {
    let url = this.api_url + 'v1/scenario_planner/promoMechanics?ohm_id=' + ohm_id + '&promo_type=' + promoTypeSelected;
    return this.http.get<Response[]>(`${url}`);
  }
  validateScenarioSave(payload: any) {

    let url = this.api_url + 'v1/scenario_planner/validateScenarioSave';
    return this.http.post<Response[]>(`${url}`, payload);
  }


}