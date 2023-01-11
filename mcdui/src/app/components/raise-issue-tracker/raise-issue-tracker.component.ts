import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IssueTrackerService } from '../../services/issue-tracker.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-raise-issue-tracker',
  templateUrl: './raise-issue-tracker.component.html',
  styleUrls: ['./raise-issue-tracker.component.scss']
})
export class RaiseIssueTrackerComponent implements OnInit {

  // Language variable
  selectedLanguage: any;
  tabIndex = 0;
  closeResult: any;
  reqType: any;
  priority: any;
  requestType: any = [];
  base64File: any;
  filename: any;
  reqName: any;
  comments: any;
  priorityList: any = [];
  attachment: any;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    public constantService: ConstantService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public issueTrackerService: IssueTrackerService,
    private util: UtilService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.document.body.classList.add(constant.issueTracker.popup_css);
    this.initialLanguageCall();
    this.requestTypeCall();
    this.getRequestTypeApiCall();
    this.getPriorityTypeApiCall();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove(constant.issueTracker.popup_css);
  }

  /** Request Type Api Call */
  requestTypeCall() {
    this.requestType = constant.issueTracker.requestType
  }

  /**Tab change  */
  changeTab(event: any) {
    this.tabIndex = event.index;
  }

  /** Initial Language Call */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  /** Request Type Api Call */
  getRequestTypeApiCall() {
    this.issueTrackerService.getRequestTypeList().subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.requestType = response.data
      }
    }, (error) => { })
  }

  /** Priority Type Api Call */
  getPriorityTypeApiCall() {
    this.issueTrackerService.getPriorityTypeList().subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.priorityList = response.data
      }
    }, (error) => { })
  }

  /** Create New Ticket */
  newTicket() {
    if (this.base64File == undefined) {
      var payload = {
        ticket_no: this.reqName,
        issue_name: this.reqName,
        request_type: this.reqType,
        priority_type: this.priority,
        comments: this.comments,
        status: constant.issueTracker.status,
        bs64_image: this.base64File
      }
    } else {
      var splitbase = this.base64File.split(',')
      this.attachment = splitbase[constant.preview_page.one]
      var payload = {
        ticket_no: this.reqName,
        issue_name: this.reqName,
        request_type: this.reqType,
        priority_type: this.priority,
        comments: this.comments,
        status: constant.issueTracker.status,
        bs64_image: this.attachment
      }
    }
    return payload;
  }

  /** Create Ticket DTO */
  createTicketDTO() {
    this.createTicketApiCall();
  }

  /** Create Ticket API Call */
  createTicketApiCall() {
    this.issueTrackerService.createTicket(this.newTicket()).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.toastr.success(this.util.languageTranslator(constant.issueTracker.createSuccess));
        this.modalService.dismissAll();
        this.router.navigateByUrl(constant.issueTracker.slash, { skipLocationChange: true }).then(() =>
          this.router.navigate([constant.NAVIGATION.ISSUETRACKER], { state: response }));
      }
    }, (error) => {
      this.toastr.error(error.message);
    })
  }

  /** Create Ticket Model */
  createTicket(ticketModal: any) {
    this.modalService.open(ticketModal, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
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

  /** Attachment Upload */
  onFileSelect(e: any): void {
    try {
      const file = e.target.files[0];
      const fReader = new FileReader()
      fReader.readAsDataURL(file)
      fReader.onloadend = (_event: any) => {
        this.filename = file.name;
        this.base64File = _event.target.result;
      }
    } catch (error) {
      this.filename = null;
      this.base64File = null;
    }
  }

}
