import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as ENV } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ScenarioComparisionService {
  public scenario_ID = new BehaviorSubject<[]>([]);
  constructor(private http: HttpClient, public router: Router) { }

  send_scenarioID(data: any){
    this.scenario_ID.next(data);
  }
  getScenarioId(): Observable<any> {
    return this.scenario_ID.asObservable();
  }

  api_url = `${ENV.serverUrl}`;
  //Add Api's Below
  public exportSendDataList(payload: any): Observable<any> {
    let url = this.api_url + `v1/scenario_planner/scenario_comparision/export`;
    return this.http.post(url, payload, { responseType: 'blob' as 'json' });
  }

  

  // getOverviewDetail(payload: any) {
  //   let url = this.api_url + 'v1/scenario_comparision/overall';
  //   return this.http.post<Response[]>(`${url}`, payload);
  // }

  // getSegmentDetail(payload: any) {
  //   let url = this.api_url + 'v1/scenario_comparision/segments';
  //   return this.http.post<Response[]>(`${url}`, payload);
  // }

 
  //Get overview graph
  // public getOverviewGraphSC(payload: any): Observable<any> {
  //   let url = this.api_url + `v1/scenario_comparision/overall/report`;
  //   return this.http.post(url, payload);
  // }

  
  //Get Scenarios
  public getScenarioslist(payload:any, page_no: any, limit: any): Observable<any> {
    let url = this.api_url + `v1/scenario_comparision/getScenarios?page=` + page_no + '&page_size=' + limit;
    return this.http.post<Response[]>(`${url}`, payload);
  }
  
  //Get segment graph
  // public getSegmentGraphSC(payload: any): Observable<any> {
  //   let url = this.api_url + `v1/scenario_comparision/segments/report`;
  //   return this.http.post(url, payload);
  // }

  //Get product graph
  // public getProductGraphSC(payload: any): Observable<any> {
  //   let url = this.api_url + `v1/scenario_comparision/products/report`;
  //   return this.http.post(url, payload);
  // }

  getGeoPromoTypeDetail(scenarioId: any) {
    let url = this.api_url + 'v1/scenario_comparision/compareByGeo?scenario_ids=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }

  getProductDetail(scenarioId: any) {
    let url = this.api_url + 'v1/scenario_comparision/compareByPg?scenario_ids=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
    
  }

  getGeoPromoTypeGraphData(scenarioId: any){
    let url = this.api_url + 'v1/scenario_comparision/compareByGeoGraph?scenario_ids=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }

  getProductGraphData(scenarioId: any) {
    let url = this.api_url + 'v1/scenario_comparision/compareByPgGraph?scenario_ids=' + scenarioId;
    return this.http.get<Response[]>(`${url}`);
    
  }

  getPermissionToEdit(scenarioId: any){
    let url = this.api_url + 'v1/scenario_comparision/editScenarioValidation?scenario_id='  + scenarioId;
    return this.http.get<Response[]>(`${url}`);
  }
}