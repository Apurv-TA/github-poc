import { Injectable } from '@angular/core';
import * as constant from '../shared/constant/constant';
import { environment as ENV } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewUserService {

  private showHomePage = new BehaviorSubject<any>(null);

  public review_user_data: any = {}

  constructor(private http: HttpClient) {

  }
  api_url = `${ENV.serverUrl}`


  // Behaviour Subject Getter and setter Starts
  getShowHomePage(): Observable<any> {
    return this.showHomePage.asObservable();
  }

  setShowHomePage(showPage: any) {
    this.showHomePage.next(showPage)
  }

  // Behaviour Subject Getter and setter Ends

  getUserReadAndWriteData() {
    this.review_user_data = this.api_url + "v1/common/permissions";
    return this.http.get<Response[]>(`${this.review_user_data}`)
  }

}
