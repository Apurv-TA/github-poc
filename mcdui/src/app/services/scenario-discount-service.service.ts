import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})



export class ScenarioDiscountServiceService {

  private scenario_name = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient, public router: Router) { }
  api_url = `${ENV.serverUrl}`;



  // Behaviour Subject Getter and setter Starts
  getScenarioName(): Observable<any> {
    return this.scenario_name.asObservable();
  }

  setScenarioName(scenarioName: any, flag: any) {
    this.scenario_name.next({scenarioName,flag});
  }

  // Behaviour Subject Getter and setter Ends

  // getScenarioDiscountRecommender(offerConfigId: any) {
  //   let url = this.api_url + `v1/scenario_planner/scenario_results/${offerConfigId}`;
  //   return this.http.get<Response[]>(`${url}`);
  // }
  // getDiscountImpactDetail(payload: any) {
  //   let url = this.api_url + 'v1/offer_configuration/scenario_metrics';
  //   return this.http.post<Response[]>(`${url}`, payload);
  // }

  // getAllScenarioImportOffer(payload: any, page_no: any, limit: any, sortBy: any, sortByDir: any) {
  //   let url = this.api_url + 'v1/scenario_planner/selection?page=' + page_no + '&page_size=' + limit + '' + '&sort=' + sortBy + '' + '&order_by=' + sortByDir + '';
  //   return this.http.post<Response[]>(`${url}`, payload);
  // }

  public exportImpactSendDataList(payload: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/scenario_metrics`;
    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }
  exportSendDataList(offerConfigId: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/scenario_offers/${offerConfigId}`;
    return this.http.get(url, { responseType: 'blob' as 'json' });
  }

  // API for scenario-impact-promo
  getImpactByGeo(scenarioId: any) {
    let url = this.api_url + 'v1/offer_configuration/impactByGeo?scenario_id=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);

  }

  // API's for scenario-recommended-offers

  getOffersByPackage(scenarioId: any) {
    let url = this.api_url + 'v1/scenario_planner/offerDetail?scenario_id=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }

  calculateImpact(payload: any) {
    let url = this.api_url + 'v1/scenario_planner/calculateImpact';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  calculateImpactIndexRank(payload: any) {
    let url = this.api_url + 'v1/scenario_planner/calculateImpactIndexRank';
    return this.http.post<Response[]>(`${url}`, payload);
  }
}