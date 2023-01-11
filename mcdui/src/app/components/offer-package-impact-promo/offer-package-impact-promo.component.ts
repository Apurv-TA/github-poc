import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../../shared/constant/constant';
import { ActivatedRoute, Router } from "@angular/router";
import { ConstantService } from '../../services/constant.service';
import { OfferPackageDetailService } from '../../services/offer-package-detail.service';
import { UtilService } from 'src/app/services/util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewKpiComponent } from '../view-kpi/view-kpi.component';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import { objectEach } from 'highcharts';

@Component({
  selector: 'app-offer-package-impact-promo',
  templateUrl: './offer-package-impact-promo.component.html',
  styleUrls: ['./offer-package-impact-promo.component.scss']
})
export class OfferPackageImpactPromoComponent implements OnInit, OnChanges {
  //Impact by Promo Channel Variable initializer
  @Input('impactDataId') impactDataId: any

  // To Pass Scenario Id
  @Input('scenarioId') scenarioId: any

  dataSourceimpact!: MatTableDataSource<any>;
  displayedColumnsimpact: string[] = constant.impact_promo_channel.displayColumns;
  detailImpactPromoDataList: any = []
  offer_config_Id: any
  selectedKpiValue: any
  selectedLanguage: any;
  impactIdArray: any = []
  getSelectedConfigId: any
  previouSelectedValue: any = []
  impactPromoDetails: any = [];
  package_id: any;
  //setCurrency
  currencyCode: any
  impactNote: any
  constructor(public translate: TranslateService,
    public constantService: ConstantService,
    public offerPackageDetailService: OfferPackageDetailService,
    public utilService: UtilService,
    private router: Router,
    public dialog: MatDialog,
    public offerRecommenderService: OfferRecommenderService) { }




  ngOnInit(): void {
    this.initialLanguageCall()
  }
  ngOnChanges() {
    this.baseApiLoader()
    // changes.prop contains the old and the new value...
  }
  //Initialize api call
  baseApiLoader() {

    this.selectedKpiValue = constant.login_page.kpichange
    this.offer_config_Id = sessionStorage.getItem(constant.login_page.offerConfigId)
    this.impactIdArray.push(sessionStorage.getItem(constant.login_page.calculate_id))
    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)
    let sendChannelObj = { offer_config_id: this.offer_config_Id, offer_id: this.impactDataId, granularity: constant.login_page.channel }

    // this.getPromoImpactDetail(sendChannelObj)
    this.configMaster()
    this.getScenariosCompareByCoop()
  }

  //Binding Api Call response
  getPromoImpactDetail(impactId: any) {
    this.offerPackageDetailService.getPromoImpactDetail(impactId).subscribe((response: any) => {
      if (!this.utilService.isNullOrEmptyOrUndefined(response)) {
        if (response.http_code == constant.login_page.reponseCode) {
          this.detailImpactPromoDataList = response.data.data
          this.dataSourceimpact = new MatTableDataSource(this.detailImpactPromoDataList);
        }
      }

    }, (error) => {

    })
  }
  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.impactNote = response.data.discount_result_impact_note;
    }, (error) => { })
  }

  //kpi change event
  kpiChangeEvent(event: any) {
    this.selectedKpiValue = event
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
  //Export download
  exportDownload(exportPayload: any) {
    this.offerPackageDetailService.exportImpactSendDataList(exportPayload).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error) => {
    })
  }

  //view kpi definition
  viewKpi() {
    const dialogRef = this.dialog.open(ViewKpiComponent, {
      width: '65%',
      height: '93%',
    });

    dialogRef.afterClosed().subscribe(result => { });
  }

  //export payload object
  exportDownloadDto() {
    this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id)
    if (!this.utilService.isNullOrEmptyOrUndefined(this.getSelectedConfigId)) {
      this.previouSelectedValue = this.getSelectedConfigId.split(',');
    } else {
      this.previouSelectedValue = []
    }
    let excelDownloadPayload = {
      granularity: constant.login_page.channel,
      offer_config_id: +this.offer_config_Id,
      offer_id: this.previouSelectedValue,
      scenario_id:this.scenarioId

    }
    this.exportDownload(excelDownloadPayload)
  }


  /** Fixed Format */
  fixedFormat(event: any) {
    return this.utilService.toFixedFormat(+event, constant.OFFER_CONFIGURATION.pctDecimal);
  }


  getScenariosCompareByCoop() {
    
    this.offerPackageDetailService.getImpactByGeo(this.scenarioId).subscribe((resp: any) => {
    let res = resp;
    this.impactPromoDetails = res.data;
    this.dataSourceimpact = new MatTableDataSource(this.impactPromoDetails);
    }, (error) => {

    })
  }

}