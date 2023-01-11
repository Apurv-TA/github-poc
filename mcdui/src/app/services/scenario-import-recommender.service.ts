import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScenarioImportRecommenderService {

  constructor(private http: HttpClient, public router: Router) { }

  api_url = `${ENV.serverUrl}`;

  getAllImportOffer(payload: any, page_no: any, limit: any) {
    let url = this.api_url + 'v1/scenario_planner/offers?page=' + page_no + '&page_size=' + limit + '';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  exportFeedSelection(payload: any): Observable<any> {
    let url = this.api_url + `v1/offer_configuration/download/feed_creation`;
    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }
  
  fetchOfferConfiguration(payload: any, page_no: any, limit: any) {
    let url = this.api_url + 'v1/offer_configuration/list?page=' + page_no + '&page_size=' + limit;
    return this.http.post<Response[]>(`${url}`, payload);
  }

}
