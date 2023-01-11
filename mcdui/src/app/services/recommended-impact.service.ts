import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnySrvRecord } from 'dns';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecommendedImpactService {

  constructor(private http: HttpClient, public router: Router) { }
  api_url = `${ENV.serverUrl}`;
  //Add Api's Below
  getSegmentTableService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/scenario_metrics';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  getCategoryTableService() {
    let url = this.api_url + 'v1/offer_configuration/promochannel/';
    return this.http.get<Response[]>(`${url}`);
  }
  getChartService(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/scenario_metrics/report';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  getChartOfferIdService(payload: any) {
    // let url = this.api_url + 'v1/offer_configuration/scenario_metrics';
    let url = this.api_url + 'v1/scenario_planner/impact';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  public exportImpactSendDataList(payload: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/scenario_metrics`;
    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }

  // API for offer-package-impact-promo
  getImpactByProductCategory(scenarioId: any) {
    let url = this.api_url + 'v1/offer_configuration/impactByProductCategory?scenario_id=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }
}