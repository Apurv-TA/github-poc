import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from 'src/app/services/constant.service';
import { OfferPackageDetailService } from 'src/app/services/offer-package-detail.service';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { UtilService } from 'src/app/services/util.service';
import * as constant from '../../shared/constant/constant';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioDiscountServiceService } from 'src/app/services/scenario-discount-service.service';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-scenario-impact-table',
  templateUrl: './scenario-impact-table.component.html',
  styleUrls: ['./scenario-impact-table.component.scss'],
})
export class ScenarioImpactTableComponent implements OnInit {
  //Impact by Promo Channel Variable initializer
  @Input('impactDataId') impactDataId: any;
  @Input('scenarioId') scenarioId: any;
  @Input('detailedExportDisable') detailedExportDisable: any;
  dataSourceimpact!: MatTableDataSource<any>;
  tabledata:any;
  tableDataSource!:MatTableDataSource<any>;
  displayedColumnsimpact: string[] = constant.impact_promo_channel.displayColumns;
  selectedKpiValue: any;
  detailImpactDiscountDataList: any = [];
  scenario_id: any;
  getSelectedConfigId: any;
  previouSelectedValue: any = [];
  kpi_list=['lift','lift_value','scenario_value','base_value'];

  selectedLanguage: any;

  @ViewChild('table1', { read: MatSort, static: true }) sort: MatSort = new MatSort;

  //setCurrency
  currencyCode: any;

  impactNote: any;
  package_id: any;
  
  impactPromoDetails: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public constantService: ConstantService,
    public scenarioDiscountServiceService: ScenarioDiscountServiceService,
    public utilService: UtilService,
    public dialog: MatDialog,
    public offerRecommenderService: OfferRecommenderService,
    private urlSecurityService: UrlSecurityService,
    public offerPackageDetailService: OfferPackageDetailService,
    
  ) {}

  ngOnInit(): void {
    this.baseApiLoader();
    this.initialLanguageCall();
  }

  ngAfterViewInit (){
    const sortState:Sort = {
      active: 'coop_name', direction: 'desc'
    }
    this.tableDataSource.sort = this.sort;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  
  baseApiLoader() {
    this.selectedKpiValue = constant.login_page.kpichange;
    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)
    this.package_id = this.urlSecurityService.decryptUsingAES256(
      this.activatedRoute.snapshot.params[constant.login_page.offerId]
    );
    this.package_id = this.package_id.replaceAll('"', '');
    
    this.getScenariosCompareByCoop();
    // this.configMaster()
  }

  DataSourceUpdateOnClick() {
    console.log("Impact ID",this.impactDataId);
    this.tabledata = this.impactDataId;
    this.tableDataSource= new MatTableDataSource(this.tabledata[this.kpi_list[this.selectedKpiValue-1]]);


  }

  /** Get Config Master */
  // configMaster() {
  //   this.offerRecommenderService.getCongigurationService().subscribe(
  //     (response: any) => {
  //       this.impactNote = response.data.discount_result_impact_note;
  //     },
  //     (error) => {}
  //   );
  // }
  
  /** Language Translation */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia]);
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
    } else {
    }
  }

  //kpi change event
  kpiChangeEvent(event: any) {
    this.selectedKpiValue = event;
    this.tableDataSource= new MatTableDataSource(this.tabledata[this.kpi_list[this.selectedKpiValue-1]]);
    console.log(this.tableDataSource);
  }

  //Export download
  exportDownload(exportPayload: any) {
    
      console.log('entered download');
      this.offerPackageDetailService.exportImpactSendDataList(exportPayload).subscribe((response: any) => {
        this.utilService.downloadFile(response)
      }, ( error :any) => {
      });
    
  }

  //export payload object
  exportDownloadDto() {
    console.log('clicked export impact');
    this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario);
    if (!this.utilService.isNullOrEmptyOrUndefined(this.getSelectedConfigId)) {
      this.previouSelectedValue = this.getSelectedConfigId.split(',');
    } else {
      this.previouSelectedValue = [];
    }
    let excelDownloadPayload = {
      granularity: constant.login_page.channel,
      offer_config_id: +this.package_id,
      offer_id: this.previouSelectedValue,
      scenario_id: this.scenarioId
    };
    this.exportDownload(excelDownloadPayload);
  }

  /** Fixed Format */
  fixedFormat(event: any) {
    return this.utilService.toFixedFormat(+event, constant.OFFER_CONFIGURATION.pctDecimal);
  }

  sortData(sort: Sort) { 
    this.tableDataSource.sort = this.sort;
     console.log("called sort");
  }

  getScenariosCompareByCoop() {
    
    this.scenarioDiscountServiceService.getImpactByGeo(this.scenarioId).subscribe(
      (resp: any) => {
        let res = resp;
        // let res = constant.impactByGeo;
        this.impactPromoDetails = res.data.data;
        this.tabledata=res.data.tabledata;
        console.log(this.tabledata);
        this.tableDataSource=new MatTableDataSource( this.tabledata[this.kpi_list[this.selectedKpiValue-1]]);
      },
      (error: any) => {}
    );
  }
}
