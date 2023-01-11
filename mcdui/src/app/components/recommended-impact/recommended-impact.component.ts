import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { RecommendedImpactService } from '../../services/recommended-impact.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { UtilService } from 'src/app/services/util.service';
import { ScenarioComparisionService } from 'src/app/services/scenario-comparision.service';
@Component({
  selector: 'app-recommended-impact',
  templateUrl: './recommended-impact.component.html',
  styleUrls: ['./recommended-impact.component.scss']
})
export class RecommendedImpactComponent implements OnInit {

  // Language variable
  selectedLanguage: any;

  // Tabset variable
  graphShow: any = true
  tabIndex = 2;
  offerConfigId: any
  //To chart
  graphData: any;
  getSelectedConfigId: any
  previouSelectedValue: any = []
  packageName: any

  segmentListDropdown: any = []
  productListDropdown: any = []
  selectedProduct: any
  scenarioId: any
  selectedSegment: any

  getSegmentViewdata: boolean = false
  getProductViewdata: boolean = false
  styleHeight: any = constant.login_page.setHeightInPx
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    public constantService: ConstantService,
    public recommendedImpactService: RecommendedImpactService,
    private urlSecurityService: UrlSecurityService,
    private utilService: UtilService, public scenarioComparisionService: ScenarioComparisionService) {
  }

  ngOnInit(): void {
    this.initialLanguageCall();
    this.getOfferConfigId()
    this.getProductDropdownData()
    this.getSegementDropdownData()


  }
  getOfferConfigId() {
    this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id)
    if (!this.utilService.isNullOrEmptyOrUndefined(this.getSelectedConfigId)) {

      this.previouSelectedValue = this.getSelectedConfigId.split(',');
    } else {
      this.previouSelectedValue = []
    }
    this.packageName = sessionStorage.getItem(constant.login_page.packagename)
    //Get offer config Id from routing url and storing 
    this.offerConfigId = this.urlSecurityService.decryptUsingAES256(this.activatedRoute.snapshot.params[constant.login_page.offerId])
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

  //Segment Graph data call
  segmentGraph(metricCode: any) {
    this.getSegmentViewdata = false
    if (!this.utilService.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.login_page.calculate_id))) {
      this.recommendedImpactService.getChartService(this.payloadWithOfferId(constant.segmentData, metricCode)).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          constant.segmentChart.xAxis.categories = response.data.scenario
          constant.segmentChart.series = [response.data.series]
          this.graphData = constant.segmentChart;
          setTimeout(() => {
            this.getSegmentViewdata = true
          }, 10);
        }


      }, (error) => { })
    } else {

      this.recommendedImpactService.getChartService(this.payload(constant.segmentData, metricCode)).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {

          constant.segmentChart.xAxis.categories = response.data.scenario
          constant.segmentChart.series = [response.data.series]
          this.graphData = constant.segmentChart;
          setTimeout(() => {
            this.getSegmentViewdata = true
          }, 10);
        }


      }, (error) => { })
    }
  }

  //Category Graph
  categoryGraph(metricCode: any) {
    this.getProductViewdata = false
    if (!this.utilService.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.login_page.calculate_id))) {

      this.recommendedImpactService.getChartService(this.payloadWithOfferId(constant.categoryData, metricCode)).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          constant.segmentProdChart.xAxis.categories = response.data.scenario
          constant.segmentProdChart.series = [response.data.series]
          this.graphData = constant.segmentProdChart;
          setTimeout(() => {
            this.getProductViewdata = true
          }, 10);
        }

      }, (error) => { })
    } else {
      this.recommendedImpactService.getChartService(this.payload(constant.categoryData, metricCode)).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          constant.segmentProdChart.xAxis.categories = response.data.scenario
          constant.segmentProdChart.series = [response.data.series]
          this.graphData = constant.segmentProdChart;
          setTimeout(() => {
            this.getProductViewdata = true
          }, 10);
        }

      }, (error) => { })
    }
  }
  // payload for graph
  payloadWithOfferId(data: any, metricCode: any) {
    let payload
    if (data == constant.segmentData) {
      payload = { granularity: constant.segmentData, segment: true, offer_config_id: this.offerConfigId, offer_id: this.previouSelectedValue, metric_code: metricCode }
    } else {
      payload = { granularity: constant.categoryData, segment: false, offer_config_id: this.offerConfigId, offer_id: this.previouSelectedValue, metric_code: metricCode }
    }
    return payload
  }
  // payload for graph
  payload(data: any, metricCode: any) {

    let payload
    if (data == constant.segmentData) {
      payload = { granularity: constant.segmentData, segment: true, offer_config_id: this.offerConfigId, offer_id: this.previouSelectedValue, metric_code: metricCode }
    } else {
      payload = { granularity: constant.categoryData, segment: false, offer_config_id: this.offerConfigId, offer_id: this.previouSelectedValue, metric_code: metricCode }
    }
    return payload
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
  //Export download
  exportDownload(exportPayload: any) {
    this.recommendedImpactService.exportImpactSendDataList(exportPayload).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error) => {
    })
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
      offer_config_id: this.offerConfigId,
      offer_id: this.previouSelectedValue
    }

    this.exportDownload(excelDownloadPayload)
  }

  //redirect summary page
  redirectToOffer() {
    this.router.navigate([constant.NAVIGATION.OFFER_PACKAGE_SUMMARY, this.urlSecurityService.encryptUsingAES256(this.offerConfigId)]);
  }


  //List datas for productKpi
  getProductDropdownData() {
    // this.scenarioComparisionService.getProductDropdown().subscribe((response: any) => {
    //   if (response.http_code == constant.login_page.reponseCode) {
    //     this.productListDropdown = response.data
    //     this.selectedProduct = response.data[0].metric_code
    //     this.categoryGraph(this.selectedProduct)
    //   }

    // }, (error) => { })
  }
  //List datas for segmentKpi
  getSegementDropdownData() {
    // this.scenarioComparisionService.getSegmentDropdown().subscribe((response: any) => {
    //   if (response.http_code == constant.login_page.reponseCode) {
    //     this.segmentListDropdown = response.data
    //     this.selectedSegment = response.data[0].metric_code
    //     this.segmentGraph(this.selectedSegment)
    //   }

    // }, (error) => { })
  }


  //select kpi product change function
  changeProduct(event: any) {
    this.categoryGraph(event)

  }

  //select kpi segment change function
  // changeSegment(event: any) {
  //   this.segmentGraph(event)

  // }
}
