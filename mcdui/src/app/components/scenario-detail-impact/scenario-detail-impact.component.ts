import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { UtilService } from 'src/app/services/util.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { OfferPackageDetailService } from 'src/app/services/offer-package-detail.service';
import { Subscription } from 'rxjs';
import { PackageSummaryService } from 'src/app/services/package-summary.service';
@Component({
  selector: 'app-scenario-detail-impact',
  templateUrl: './scenario-detail-impact.component.html',
  styleUrls: ['./scenario-detail-impact.component.scss']
})
export class ScenarioDetailImpactComponent implements OnInit {
  // Language variable
  selectedLanguage: any;
  public subscription: Subscription = new Subscription();
  // Tabset variable
  graphShow: any = true
  tabIndex = 1;
  offerConfigId: any
  //To chart
  graphData: any;
  getSelectedConfigId: any
  previouSelectedValue: any = []
  packageName: any
  scenarioId: any

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    public constantService: ConstantService,
    public utilService: UtilService,
    public packageSummaryService: PackageSummaryService,
    public offerPackageDetailService: OfferPackageDetailService,
    private urlService: UrlSecurityService) {
  }

  ngOnInit(): void {
    this.initialLanguageCall();
    this.getOfferConfigId()
   
  }
  getOfferConfigId() {
    this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario)
    if (!this.utilService.isNullOrEmptyOrUndefined(this.getSelectedConfigId)) {

      this.previouSelectedValue = this.getSelectedConfigId.split(',');
    } else {
      this.previouSelectedValue = []
    }
    this.packageName = sessionStorage.getItem(constant.login_page.scenario_result_name)
    //Get offer config Id from routing url and storing 
    this.offerConfigId = this.urlService.decryptUsingAES256(this.activatedRoute.snapshot.params[constant.login_page.offerId]);
  }

  //Language set
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  /**Tab change  */
  changeTab(event: any) {
    this.tabIndex = event.index;
  }
  /**show Table & Graph */
  showGraph() {
    this.graphShow = false;
    if (this.tabIndex == 0) {
      this.graphData = constant.segmentChart;
    } else {
      this.graphData = constant.segmentProdChart;
    }
  }
  showTable() {
    this.graphShow = true
  }
  getScenarioId() {

    this.subscription.add(this.packageSummaryService.getScenarioId().subscribe((val: any) => {
      this.scenarioId = val;
    },(error) =>{    
    })
    )
  }
  //export payload object
  exportDownloadDto() {
    this.getScenarioId();
    this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario)
    if (!this.utilService.isNullOrEmptyOrUndefined(this.getSelectedConfigId)) {
      this.previouSelectedValue = this.getSelectedConfigId.split(',');
    } else {
      this.previouSelectedValue = []
    }
    let excelDownloadPayload = {
      granularity: constant.login_page.channel,
      offer_config_id: this.offerConfigId,
      offer_id: this.previouSelectedValue,
      scenario_id:this.scenarioId,
    }
    this.exportDownload(excelDownloadPayload)
  }

  //Export download
  exportDownload(exportPayload: any) {
    this.offerPackageDetailService.exportImpactSendDataList(exportPayload).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error) => {
    })
  }
  //redirect summary page
  redirectToOffer() {
    this.router.navigate([constant.NAVIGATION.SCENARIO_RESULTS, this.urlService.encryptUsingAES256(this.offerConfigId)]);
  }



}
