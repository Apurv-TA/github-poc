import { Component, OnInit } from '@angular/core';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { TranslateService } from '@ngx-translate/core';
import { ScenarioComparisionService } from 'src/app/services/scenario-comparision.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from "@angular/router";
import { OfferPackageDetailService } from '../../services/offer-package-detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scenario-comparision-detail',
  templateUrl: './scenario-comparision-detail.component.html',
  styleUrls: ['./scenario-comparision-detail.component.scss']
})
export class ScenarioComparisionDetailComponent implements OnInit {
  graphShow: boolean = true
  scenarioId: any
  // Language variable
  selectedLanguage: any;
  public subscription:Subscription=new Subscription;

  constructor(public translate: TranslateService,
    private router: Router,
    public constantService: ConstantService,
    public scenarioComparisionService: ScenarioComparisionService,
    public utilService: UtilService,
    public offerPackageDetailService: OfferPackageDetailService) { }

  ngOnInit(): void {
    this.scenarioId = sessionStorage.getItem(constant.login_page.scenario_id)
    this.initialLanguageCall();
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
  /**show Table & Graph */
  showGraph() {
    this.graphShow = false;
  }
  showTable() {
    this.graphShow = true
  }

  exportComparison() {
    this.getScenarioId();
    this.scenarioId=String(this.scenarioId);
    let payload={
      "scenario_id":this.scenarioId
    }
    this.offerPackageDetailService.exportSendComparisionData(payload).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error) => {
    })
  }
  getScenarioId() {
    this.subscription.add(this.scenarioComparisionService.getScenarioId().subscribe((val: any) => {
      this.scenarioId = val;
      // console.log("Scenario Id =", this.scenarioId);

    }, (error) => {

    })
    )
  }

  //Export download
  exportDownload(exportPayload: any) {
    this.scenarioComparisionService.exportSendDataList(exportPayload).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error) => {
    })
  }
  /**Go Back to Sceanrio Selection */
  backtoSelection() {
    this.router.navigate([constant.NAVIGATION.SCENARIO_COMPARISON]);
  }

}
