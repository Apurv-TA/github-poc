import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AnySrvRecord } from 'dns';
import { environment as ENV } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageSummaryService {

  private scenario_Id = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, public router: Router) { }

  api_url = `${ENV.serverUrl}`;
  //Add Api's Below
  // getAllOfferConfiguration(payload: any, page_no: any, limit: any, sortBy: any, sortByDir: any) {
  //   let url = this.api_url + 'v1/offer_configuration/list?page=' + page_no + '&page_size=' + limit + '' + '&sort=' + sortBy + '' + '&order_by=' + sortByDir + '';
  //   return this.http.post<Response[]>(`${url}`, payload);
  // }

  // Behaviour Subject Getter and setter Starts
  getScenarioId(): Observable<any> {
    return this.scenario_Id.asObservable();
  }

  setScenarioId(scenarioId: any) {
    this.scenario_Id.next(scenarioId)
  }

  // Behaviour Subject Getter and setter Ends

  getAllOfferConfiguration(payload: any, page_no: any, limit: any) {
    let url = this.api_url + 'v1/offer_configuration/list?page=' + page_no + '&page_size=' + limit;
    return this.http.post<Response[]>(`${url}`, payload);
  }

  getAllSegments() {
    let url = this.api_url + 'v1/offer_configuration/all/segments';
    return this.http.get<Response[]>(`${url}`);
  }
  getAllStatus() {
    7
    let url = this.api_url + 'v1/offer_configuration/status/list';
    return this.http.get<Response[]>(`${url}`);
  }

  deleteSelectedPackage(payload: any) {
    let url = this.api_url + 'v1/offer_configuration/delete';
    return this.http.post<Response[]>(`${url}`, payload);
  }
}
