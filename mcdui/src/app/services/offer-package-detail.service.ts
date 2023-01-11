import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OfferPackageDetailService {

  constructor(private http: HttpClient, public router: Router) { }
  api_url = `${ENV.serverUrl}`;




  getofferSummaryRecommender(offerConfigId: any) {
    let url = this.api_url + `v1/offer_configuration/scenario_offers/${offerConfigId}`;
    return this.http.get<Response[]>(`${url}`);
  }
  getPromoImpactDetail(payload: any) {
    //let url = this.api_url + 'v1/offer_configuration/scenario_metrics';
    let url = this.api_url + 'v1/scenario_planner/impact';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  getImpactIndexWeight(offerConfigId: any): Observable<any> {
    let url = this.api_url + 'v1/offer_configuration/segment/weight_details?offer_config_id=' + offerConfigId;
    return this.http.get<Response[]>(`${url}`);
  }
  saveImpactIndexWeight(payload: any): Observable<any> {
    let url = this.api_url + 'v1/offer_configuration/segment/save_weight_details';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  saveScenarioImpactIndexWeight(payload: any): Observable<any> {
    let url = this.api_url + 'v1/scenario_planner/impact/save_weight_details';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  //API for Export Promos Download
  public exportSendDataList(scenarioId: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/promos`;
    let payload = `{"scenario_id":${scenarioId}}`;
    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }

  public exportImpactIndexSendDataList(offerConfigId: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/scenario_offers_impact_index/${offerConfigId}`;
    return this.http.get(url, { responseType: 'blob' as 'json' });
  }

  //API for export Impact Download
  public exportImpactSendDataList(payload: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/impact`;
    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }

  //API for product mapping download
  public exportGetProductMapping(): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/download/product_mapping`;
    return this.http.get(url, { responseType: 'blob' as 'json' });
  }

  //API for export mechanic details download
  public exportGetMechanicDetails(): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/download/mechanic_details`;
    return this.http.get(url, { responseType: 'blob' as 'json' });
  }

  //API for export comparision download
  public exportSendComparisionData(payload:any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/export/comparision`;
    // let payload = `{"scenario_id":${scenarioId}}`;

    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }
  // API's for Package Summary Details

  getPackageSummaryDetail(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/packageSummaryDetails';
    return this.http.post<Response[]>(`${url}`, payload);
  }
  getPackageSummaryDetailPreview(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/packageSummaryDetailsPreview?package_id=' + payload;
    return this.http.get<Response[]>(`${url}`);
  }

  // API for offer-package-impact-promo
  getImpactByGeo(scenarioId: any) {
    let url = this.api_url + 'v1/offer_configuration/impactByGeo?scenario_id=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }

}
