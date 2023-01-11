import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from 'src/app/services/constant.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import * as constant from '../../shared/constant/constant';
import { Location } from '@angular/common';
import { PackageSummaryService } from 'src/app/services/package-summary.service';
@Component({
  selector: 'app-offer-summary-package',
  templateUrl: './offer-summary-package.component.html',
  styleUrls: ['./offer-summary-package.component.scss']
})
export class OfferSummaryPackageComponent implements OnInit {
  //intialize values
  offerConfigId: any
  packageId: any
  packageName: any
  selectedLanguage: any;
  promoRecommenderFlag: boolean = true;

  constructor(public translate: TranslateService,
    public constantService: ConstantService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private urlSecurityService: UrlSecurityService, private location: Location) { }

  ngOnInit(): void {
    this.initialLanguageCall()
    this.getOfferConfigId()
  }

  getOfferConfigId() {

    //Get offer config Id from routing url and storing 
    this.offerConfigId = this.urlSecurityService.decryptUsingAES256(this.activatedRoute.snapshot.params[constant.login_page.offerId])
    this.offerConfigId = this.offerConfigId.replaceAll('"', '')
    sessionStorage.setItem(constant.login_page.offerConfigId, this.offerConfigId)

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

  goBack() {
    if (sessionStorage.getItem(constant.login_page.pagefrom) == constant.login_page.one) {
      this.router.navigate([constant.NAVIGATION.IMPORT_RECOMMENDER]);
    } else if (sessionStorage.getItem(constant.login_page.pagefrom) == constant.login_page.two) {
      this.router.navigate([constant.NAVIGATION.SCENARIO_COMPARISON]);
    } else if (sessionStorage.getItem(constant.login_page.pagefrom) == constant.login_page.three) {
      this.router.navigate([constant.NAVIGATION.FEED_SELECTION]);
    } else {
      this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
    }

  }

  getDiscountPackageName(event: any) {
    this.packageName = event
    this.packageId = event.id
  }

}
