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

@Component({
  selector: 'app-closed-issue',
  templateUrl: './closed-issue.component.html',
  styleUrls: ['./closed-issue.component.scss']
})
export class ClosedIssueComponent implements OnInit {

  /**Table variables  */
  displayedColumns: string[] = constant.issueTracker.displayColumns;
  selectedLanguage: any;

  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  pendingData: any;
  closedIssueData: any;
  /** Pagination */
  pageIndex = constant.preview_page.zero;
  limit: number = constant.preview_page.five;
  count: any;

  constructor(public recommendedImpactService: RecommendedImpactService,
    public translate: TranslateService, public constantService: ConstantService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.closedIssueApiCall();
  }

  /**Pending Issues API Call */
  closedIssueApiCall() {
    this.issueTrackerService.getAllPendingIssues(this.pageIndex + constant.preview_page.one, this.limit, constant.issueTracker.closed).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.closedIssueData = response.data.data;
        this.count = response.data.count;
        this.dataSource = new MatTableDataSource(this.closedIssueData);
        this.dataSource.sort = this.sort;
      }
    }, (error) => {

    })
  }

  /** Dynamic Pagination */
  pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    this.closedIssueApiCall();
  }

}
