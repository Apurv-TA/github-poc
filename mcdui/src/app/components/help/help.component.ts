import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ConstantService } from 'src/app/services/constant.service';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import * as constant from '../../shared/constant/constant';
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  selectedLanguage: any
  downloadFAQ: any
  supportEmail: any;
  downloadUserManual: any;
  feed_creation: any;
  scenario_comparison: any;
  scenario_planner: any;
  promo_recommender: any;
  login_and_help: any;
  constructor(public translate: TranslateService, public constantService: ConstantService, private router: Router, public offerRecommenderService: OfferRecommenderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initialLanguageCall()
    this.getConfigurationApiCall()
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
  backToHome() {
    this.router.navigate([constant.NAVIGATION.HOME_PAGE]);
  }

  supportSummary() {
    this.router.navigate([constant.NAVIGATION.ISSUETRACKER]);
  }

  getConfigurationApiCall() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.downloadFAQ = response.data.faq_link;
      this.supportEmail = response.data.support_email;
      this.downloadUserManual = response.data.user_manual;
      this.login_and_help = response.data.login_and_help;
      this.promo_recommender =response.data.promo_recommender;
      this.scenario_planner=response.data.scenario_planner;
      this.scenario_comparison=response.data.scenario_comparison;
      this.feed_creation=response.data.feed_creation;
    }, (error) => {
      this.toastr.error(error.error.data);
    })
  }
}
