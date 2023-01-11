import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { RecommendedImpactService } from '../../services/recommended-impact.service';
import { UtilService } from 'src/app/services/util.service';
import { IssueTrackerService } from '../../services/issue-tracker.service';
import { PageEvent } from '@angular/material/paginator';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-issue',
  templateUrl: './pending-issue.component.html',
  styleUrls: ['./pending-issue.component.scss']
})
export class PendingIssueComponent implements OnInit {

  /**Table variables  */
  displayedColumns: string[] = constant.issueTracker.displayColumns;
  selectedLanguage: any;

  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  pendingData: any;
  /** Pagination */
  pageIndex = constant.preview_page.zero;
  limit: number = constant.preview_page.five;
  pendingIssueData: any;
  count: any;
  closeResult: any;
  requestName: any;
  previewData: any;
  requestType: any;
  priorityType: any;
  comments: any;
  requestStatus: any;
  requestID: any;
  requestNo: any;
  canUpdate: boolean = false;

  constructor(public recommendedImpactService: RecommendedImpactService,
    public translate: TranslateService, public constantService: ConstantService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public utilService: UtilService,
    public issueTrackerService: IssueTrackerService,
  ) { }

  ngOnInit(): void {
    this.initialLanguageCall();
    this.initialDataCall();
  }

  /** Language Translation */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  /** Initial API Call */
  initialDataCall() {
    this.pageIndex = constant.preview_page.zero;
    this.pendingIssueApiCall();
  }

  /**Pending Issues API Call */
  pendingIssueApiCall() {
    this.issueTrackerService.getAllPendingIssues(this.pageIndex + constant.preview_page.one, this.limit, constant.issueTracker.status).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.pendingIssueData = response.data.data;
        this.count = response.data.count;
        this.dataSource = new MatTableDataSource(this.pendingIssueData);
        this.dataSource.sort = this.sort;
      }
    }, (error) => {

    })
  }

  /** Dynamic Pagination */
  pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    this.pendingIssueApiCall();
  }

  /** Preview Support Model */
  supportPreview(previewModal: any, support_id: any) {
    this.issueTrackerService.previewTicket(support_id).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.previewData = response.data;
        this.requestID = this.previewData.support_id;
        this.requestNo = this.previewData.ticket_no;
        this.requestName = this.previewData.issue_name;
        this.requestType = this.previewData.request_type.request_name;
        this.priorityType = this.previewData.priority_type.priority_name;
        this.comments = this.previewData.comments;
        this.requestStatus = this.previewData.status;
        this.validateUser(this.previewData);
      }
    }, (error) => { })

    this.modalService.open(previewModal, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return constant.login_page.pressEsc;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return constant.login_page.byClickBack;
    } else {
      return `with: ${reason}`;
    }
  }

  /** Validate User for Status Update */
  validateUser(previewData: any) {
    if (previewData.can_update == true) {
      this.canUpdate = true;
    } else {
      this.canUpdate = false;
    }
  }

  /** Update Status DTO */
  updateStatusDTO() {
    this.updateStatus();
  }

  /** Update Status Payload */
  statusPayload() {
    var payload = {
      status: constant.issueTracker.closed,
      comments: ""
    }
    return payload
  }

  /** Status Update */
  updateStatus() {
    this.issueTrackerService.updateTicketStatus(this.statusPayload(), this.requestID).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.toastr.success(this.utilService.languageTranslator(constant.issueTracker.updateSuccess));
        this.modalService.dismissAll();
      }
    })
  }

}
