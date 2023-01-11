import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { RecommendedImpactService } from '../../services/recommended-impact.service';
import { UtilService } from 'src/app/services/util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewKpiComponent } from '../view-kpi/view-kpi.component';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
export interface PeriodicElement {
  serial_no: number,
  segment: string,
  gc_change: number,
  uc_change: number,
  avg_check: number,
  gp_change: number,
  net_sales: number
}

@Component({
  selector: 'app-scenario-impact-bysegment',
  templateUrl: './scenario-impact-bysegment.component.html',
  styleUrls: ['./scenario-impact-bysegment.component.scss']
})
export class ScenarioImpactBysegmentComponent implements OnInit {

  /**Table variables  */
  displayedColumns: string[] = constant.segementData.displayColumns;
  selectedLanguage: any;
  from_page: any
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  promoChannelData: any;
  /**Segement dropdown variable */
  segmentList: any;
  selectedSegment = constant.login_page.kpichange;
  scenarioTableShow: boolean = false;
  offerConfigId: any
  getSelectedConfigId: any
  previouSelectedValue: any = []

  //setCurrency
  currencyCode: any

  impactNote: any
  constructor(public recommendedImpactService: RecommendedImpactService,
    public translate: TranslateService, public constantService: ConstantService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    public offerRecommenderService: OfferRecommenderService,
    public utilService: UtilService,
  ) {

  }

  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.segmentList = constant.productCatgoryData.segmentList
    this.offerConfigId = sessionStorage.getItem(constant.login_page.offerIdScenario)
    this.initialLanguageCall();
    this.initialDataCall();
    this.configMaster()

  }
  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.impactNote = response.data.discount_result_impact_note;
    }, (error) => { })
  }
  /** Initial Data Call */
  initialDataCall() {
    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)

    if (!this.utilService.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.login_page.calculate_id_scenario))) {
      this.recommendedImpactService.getChartOfferIdService(this.payloadWithOfferId(constant.segmentData)).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          this.promoChannelData = response.data.data;
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.promoChannelData);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 1000)
        } else { }

      }, (error) => { })
    } else {
      this.recommendedImpactService.getSegmentTableService(this.payload(constant.segmentData)).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          this.promoChannelData = response.data;
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.promoChannelData);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 1000)
        } else { }

      }, (error) => { })
    }
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

  /** Percent to Scenario Change */
  onSelectionChange(event: any) {
    this.selectedSegment = event.value;

  }


  payload(data: any) {
    let payload
    if (data == constant.segmentData) {
      payload = { granularity: constant.segmentData, offer_config_id: this.offerConfigId }
    }
    return payload
  }

  //view kpi definition
  viewKpi() {
    const dialogRef = this.dialog.open(ViewKpiComponent, {
      width: '65%',
      height: '93%',
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  // payload for graph
  payloadWithOfferId(data: any) {
    this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario)
    if (!this.utilService.isNullOrEmptyOrUndefined(this.getSelectedConfigId)) {

      this.previouSelectedValue = this.getSelectedConfigId.split(',');
    } else {
      this.previouSelectedValue = []
    }
    let payload
    if (data == constant.segmentData) {
      payload = { granularity: constant.segmentData, offer_id: this.previouSelectedValue, offer_config_id: this.offerConfigId }
    }
    return payload
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  /** Fixed Format */
  fixedFormat(event: any) {
    return this.utilService.toFixedFormat(+event, constant.OFFER_CONFIGURATION.pctDecimal);
  }
}
