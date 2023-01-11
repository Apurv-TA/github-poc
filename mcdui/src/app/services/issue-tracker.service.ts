import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment as ENV } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueTrackerService {

  constructor(private http: HttpClient, public router: Router) { }
  api_url = `${ENV.serverUrl}`;

  getRequestTypeList() {
    let url = this.api_url + 'v1/support/request_types/list';
    return this.http.get<Response[]>(`${url}`);
  }

  getPriorityTypeList() {
    let url = this.api_url + 'v1/support/priority_types/list';
    return this.http.get<Response[]>(`${url}`);
  }

  getAllPendingIssues(page_no: any, limit: any, status: any) {
    let url = this.api_url + 'v1/support/ticket/list?page=' + page_no + '&page_size=' + limit + '' + '&status=' + status;
    return this.http.get<Response[]>(`${url}`);
  }

  createTicket(payload: any) {
    let url = this.api_url + 'v1/support/create_ticket';
    return this.http.post<Response[]>(`${url}`, payload);
  }

  previewTicket(support_id: any) {
    let url = this.api_url + `v1/support/ticket/${support_id}`;
    return this.http.get<Response[]>(`${url}`);
  }

  updateTicketStatus(payload: any, support_id: any) {
    let url = this.api_url + `v1/support/update_ticket/${support_id}`;
    return this.http.put<Response[]>(`${url}`, payload);
  }
}
