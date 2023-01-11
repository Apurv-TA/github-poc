import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as constant from './../../shared/constant/constant';
import { PackageSummaryService } from '../../services/package-summary.service';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from '../../services/constant.service';
import { ScenarioImportRecommenderService } from '../../services/scenario-import-recommender.service';
import { Title } from "@angular/platform-browser";
import { ScenarioNameService } from 'src/app/services/scenario-name.service';

@Component({
  selector: 'app-scenario-planner-landing',
  templateUrl: './scenario-planner-landing.component.html',
  styleUrls: ['./scenario-planner-landing.component.scss']
})
export class ScenarioPlannerLandingComponent implements OnInit {

  /**Language Translation */
  selectedLanguage: any;

  /** Import Scenario Declaration */
  importShow: boolean = false;
  offerRecommedData: any;

  constructor(private router: Router,
    public packageSummaryService: PackageSummaryService,
    public translate: TranslateService,
    public constantService: ConstantService,
    public scenarioImportService: ScenarioImportRecommenderService,
    private titleService: Title,
    private scenarioservice: ScenarioNameService,
  ) { }

  ngOnInit(): void {
    this.initialLangCall();
  }

  /**Language Translation Call */
  initialLangCall() {
    sessionStorage.removeItem(constant.scenario_name.offer_config_id)
    sessionStorage.removeItem(constant.scenario_name.scenario_form)
    sessionStorage.removeItem(constant.scenario_name.disablelist) 
    sessionStorage.removeItem('segment_scenario_form')
    sessionStorage.removeItem(constant.scenario_name.current_offer_config_id);
    this.titleService.setTitle(constant.login_page.scenario_planner);
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    }
  }

  /**Import Recommender list */
  importOffer() {
    sessionStorage.removeItem(constant.scenario_name.scenario_type);
    sessionStorage.removeItem(constant.scenario_name.segmentConfig);
    sessionStorage.removeItem("FixedPromos");
    this.scenarioservice.setScenarioPlannerFlag('IMPORT_RECOMMENDER');
    this.router.navigate([constant.NAVIGATION.IMPORT_RECOMMENDER]);
  }

  /**Back to Scenario Landing Page */
  goBack() {
    this.importShow = false;
  }

  /**create scenario */
  redirect(){
    sessionStorage.removeItem(constant.scenario_name.segmentConfig);
    sessionStorage.removeItem("FixedPromos");
    this.scenarioservice.setScenarioPlannerFlag('CREATE_PROMOS');
    this.router.navigate([constant.NAVIGATION.CREATE_SCENARIO]);
  }
}
