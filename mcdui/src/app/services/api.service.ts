import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '../../environments/environment';
import { Router } from '@angular/router';
import * as constant from '../shared/constant/constant';


/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, public router: Router) { }
  api_url = `${ENV.serverUrl}`;

  public getToken(): any {
    let loginResponse = JSON.parse(sessionStorage.getItem(constant.login_page.loginResponse) || '{}');
    return loginResponse.access
  }
  public refreshToken(): any {
    return localStorage.getItem('refresh_token')
  }
  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  //Add Api's Below
  login(payload: any) {
    let url = this.api_url + 'token';
    return this.http.post<Response[]>(`${url}`, payload);
  }


  //Language Api's Below
  languageDefault() {
    let url = this.api_url + 'v1/login/language/list';
    return this.http.get<Response[]>(`${url}`);
  }

  //forgot pass Api
  forgot(payload: any) {
    let url = this.api_url + 'v1/login/resetpasswordtoken/';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  //forgot pass Api
  reset(payload: any) {
    let url = this.api_url + 'v1/login/confirm/';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  //support email Api
  supportEmail() {
    let url = this.api_url + 'v1/login/support_email';
    return this.http.get<Response[]>(`${url}`);
  }

  //user access Api
  userAccess() {
    let url = this.api_url + 'v1/login/get_user_group_details';
    return this.http.get<Response[]>(`${url}`);
  }
}