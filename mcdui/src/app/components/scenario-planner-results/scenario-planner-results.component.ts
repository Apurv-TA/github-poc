import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from 'src/app/services/constant.service';
import * as constant from '../../shared/constant/constant';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ReviewUserService } from 'src/app/services/review-user.service';
import { Subscription } from 'rxjs';
import { ScenarioDiscountServiceService } from 'src/app/services/scenario-discount-service.service';

@Component({
  selector: 'app-scenario-planner-results',
  templateUrl: './scenario-planner-results.component.html',
  styleUrls: ['./scenario-planner-results.component.scss'],
})
export class ScenarioPlannerResultsComponent implements OnInit, OnDestroy {
  selectedLanguage: any;
  scenarioName: any;
  scenarioBackBtn: boolean = false;



  // Read And Write Variables

  disable_import_recommender_page: boolean = false;

  // Behaviour subject Subscription
  public subscription = new Subscription();

  constructor(
    public translate: TranslateService,
    public constantService: ConstantService,
    public router: Router,
    private utils: UtilService,
    public readAndWriteService: ReviewUserService,
    private scenarioDiscountService: ScenarioDiscountServiceService
  ) { }

  ngOnInit(): void {
    this.checkUserAccess();
    this.initialLanguageCall();
    this.getScenarioResultsPage();
    this.readAndWritePermission();
  }
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

  /** Check Access */
  checkUserAccess() {
    this.scenarioBackBtn = this.utils.userAccess(constant.userAccess.sp_back_btn);
  }

  navToScenarioComparison() {
    this.router.navigate([constant.NAVIGATION.SCENARIO_COMPARISON]);
  }
  navToScenarioResult() {
    if (sessionStorage.getItem(constant.login_page.pagefrom) == constant.login_page.two) {
      this.router.navigate([constant.NAVIGATION.SCENARIO_COMPARISON]);
    } else if (sessionStorage.getItem(constant.login_page.pagefrom) == constant.login_page.three) {
      this.router.navigate([constant.NAVIGATION.FEED_SELECTION]);
    } else {
      this.router.navigate([constant.NAVIGATION.IMPORT_RECOMMENDER]);
    }
  }

  /** get scenario name from result page */
  getScenarioResultsPage() {
    // this.scenarioDiscountService.setScenarioName('');
    this.subscription.add(this.scenarioDiscountService.getScenarioName().subscribe((response: any) => {
      if(response.flag == 'scenario-selection'){
        this.scenarioName = response.scenarioName;
        this.scenarioDiscountService.setScenarioName('','');
      } else if(response.flag == 'feed-selection'){
        this.scenarioName = response.scenarioName;
        this.scenarioDiscountService.setScenarioName('','');
      } else if(response.flag == 'scenario-name'){
        this.scenarioName = response.scenarioName;
        this.scenarioDiscountService.setScenarioName('','');
      } else {
        this.scenarioDiscountService.setScenarioName('','');
      }
      
    }, (error) => {

    }))

  }


  readAndWritePermission() {

    this.readAndWriteService.getUserReadAndWriteData().subscribe((resp: any) => {
      if (constant.NAVIGATION.SCENARIO_RESULTS == resp.data.scenario_planner.scenario_results_page.link) {
        this.disable_import_recommender_page = resp.data.scenario_planner.import_recommender_page.show_page;
      }

    }, (error) => {

    });


  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
