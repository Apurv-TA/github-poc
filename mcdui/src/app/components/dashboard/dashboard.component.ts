import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import * as CryptoJS from 'crypto-js';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import * as constant from '../../shared/constant/constant';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../services/api.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { UtilService } from 'src/app/services/util.service';
import { ReviewUserService } from 'src/app/services/review-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit, OnDestroy {
  selectedLanguage: any;
  userAccess: any = {};
  sp_grid: boolean = false;

  //Read And Write Variables
  show_scenario_planner_card: boolean = false;

  public subscription = new Subscription();

  constructor(public cryptoService: UrlSecurityService,
    public translate: TranslateService,
    private titleService: Title,
    private router: Router,
    public apiService: ApiService,
    private util: UtilService,
    public readAndWriteService: ReviewUserService) {
    translate.addLangs(['English', 'Russia'])


  }

  message = "Haris!!";
  secretCode = "harish2753";

  encrypted: any;
  decrypted: any;


  ngOnInit(): void {
    this.titleService.setTitle(constant.login_page.dashboardTitle);
    this.selectedLanguage = localStorage.getItem('lang');
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    }
    this.readAndWritePermission();
  }



  


  /**Navigate to Discount Recommender */
  discountRecommender() {
    this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
  }

  /**Navigate to Scenario Planner */
  scenarioPlanner() {
    this.router.navigate([constant.NAVIGATION.SCENARIO_LANDING]);
  }

  /**Navigate to Scenario Comparison */
  scenarioComparison() {
    this.router.navigate([constant.NAVIGATION.SCENARIO_COMPARISON]);
  }

  /**Navigate to Feed Selection */
  feedCreation() {
    this.router.navigate([constant.NAVIGATION.FEED_SELECTION]);
  }

  readAndWritePermission(){
    this.subscription.add(this.readAndWriteService.getShowHomePage().subscribe((res) =>{
      this.show_scenario_planner_card = res;
    }))
  }

  ngOnDestroy() {
     // unsubscribe to ensure no memory leaks
     this.subscription.unsubscribe();
  }
}
