import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnySrvRecord } from 'dns';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OfferRecommenderService {
  public prev_name = new BehaviorSubject<[]>([]);
  public offersSelectedList = new BehaviorSubject<[]>([]);
  public offersConfigList = new BehaviorSubject<[]>([]);

  constructor(private http: HttpClient, public router: Router) { }

  send_Prev(data: any) {
    this.prev_name.next(data);
  }
  getPrev(): Observable<any> {
    return this.prev_name.asObservable();
  }
  sendOfferListdata(data: any) {
    this.offersSelectedList.next(data);
  }
  getOfferListdata(): Observable<any> {
    return this.offersSelectedList.asObservable();
  }
  sendOfferConfigdata(data: any) {
    this.offersConfigList.next(data);
  }
  getOfferConfigdata(): Observable<any> {
    return this.offersConfigList.asObservable();
  }
  api_url = `${ENV.serverUrl}`;
  //Add Api's Below
  // getPromoChannelService() {
  //   let url = this.api_url + 'v1/offer_configuration/promochannel/';
  //   return this.http.get<Response[]>(`${url}`);
  // }
  getSegmentChannelService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/segment/list';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  getProductChannelService() {
    let url = this.api_url + 'v1/offer_configuration/product-category/';
    return this.http.get<Response[]>(`${url}`);
  }
  getItemChannelService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/getitem/';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  getPromoMechService() {
    let url = this.api_url + 'v1/offer_configuration/promomechanic/';
    return this.http.get<Response[]>(`${url}`);
  }
  getPromoObjectiveService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/promoobjective/list';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  getCongigurationService() {
    let url = this.api_url + 'v1/offer_configuration/config_master/';
    return this.http.get<Response[]>(`${url}`);
  }
  getCopyPackageService(offer_id: any) {
    let url = this.api_url + 'v1/common/copyPackage?scenario_id=' + offer_id;
    return this.http.get<Response[]>(`${url}`);
  }
  
  // getDuration() {
  //   let url = this.api_url + 'v1/offer_configuration/offer_duration/';
  //   return this.http.get<Response[]>(`${url}`);
  // }
  getFixedPromoList(id1: any, id2: any, startDate: any, duration: any) {
    if(id2 == ''){
      let url = this.api_url + 'v1/common/fixedPromos?ohm_id=' + id1.toString() + '&startDate=' + startDate + '&duration=' + duration;
      return this.http.get<Response[]>(`${url}`);
    }
    else{
      let url = this.api_url + 'v1/common/fixedPromos?ohm_id=' + id1.toString() + ',' + id2.toString() + '&startDate=' + startDate + '&duration=' + duration;
      return this.http.get<Response[]>(`${url}`);
    }
  }
  fetchCoopDetails(ohm_id: any) {
    let url = this.api_url + 'v1/offer_configuration/promocfg?ohm_id=' + ohm_id;
    return this.http.get<Response[]>(`${url}`);
  }
  fetchCompitionList() {
    let url = this.api_url + 'v1/common/competitionPromos';
    return this.http.get<Response[]>(`${url}`);
  }
  getGeoList() {
    let url = this.api_url + 'v1/common/geos';
    return this.http.get<Response[]>(`${url}`);
  }
  getCoopList(selectedGeoList: any) {
    let url = this.api_url + 'v1/offer_configuration/geoHier?geo_ids=' + selectedGeoList;
    return this.http.get<Response[]>(`${url}`);
  }
  saveOfferService(payload: any) {
    let url = this.api_url + 'v1/common/savePackage';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  // saveOfferService(payload: any){
  //   let url = this.api_url + 'v1/offer_configuration/save/1';
  //   return this.http.post<Response[]>(`${url}`,payload);
  // }

  updateOfferService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/save/1';
    return this.http.put<Response[]>(`${url}`, payload);
  }

  submitOfferService(payload: any) {
    let url = this.api_url + 'v1/common/savePackage';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  updateSubmitOfferService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/save/2';
    return this.http.put<Response[]>(`${url}`, payload);
  }

  editOfferService(offer_config_id: number) {
    let url = this.api_url + 'v1/offer_configuration/edit/' + offer_config_id;
    return this.http.get<Response[]>(`${url}`);
  }

  getComDisBrandService() {
    let url = this.api_url + 'v1/offer_configuration/brands';
    return this.http.get<Response[]>(`${url}`);
  }

  getComDiscountsService() {
    let url = this.api_url + 'v1/offer_configuration/discounts';
    return this.http.get<Response[]>(`${url}`);
  }


  // API's for Offer-package-recommended-offers

  getOffersByPackage(scenarioId: any) {
    let url = this.api_url + 'v1/offer_configuration/offerDetail?scenario_id=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }

  getFixedPromos() {
    let url = this.api_url + 'v1/common/viewFixedPromos';
    return this.http.get<Response[]>(`${url}`);
  }
}
