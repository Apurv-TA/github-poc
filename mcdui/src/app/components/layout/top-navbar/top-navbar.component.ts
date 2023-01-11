import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from "@angular/router";
import * as constant from '../../../shared/constant/constant';
import { UtilService } from 'src/app/services/util.service';
import { ReviewUserService } from 'src/app/services/review-user.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  @HostBinding('attr.dir') dir = constant.login_page.Russia
  showMobileMenu: boolean = false;
  userName: any;
  userInfo: any = {};
  loginResponse: any;
  discount_: boolean = false

  sp_menu: boolean = false;

  //Read And Write Variables
  show_scenario_planner_card: boolean = false;
  constructor(public translate: TranslateService, public router: Router, public route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private util: UtilService, public readAndWriteService: ReviewUserService
  ) {

  }

  ngOnInit(): void {
    this.checkUserAccess()
    this.userInfo = JSON.parse(sessionStorage.getItem('loginResponse') || '{}');
    if (Object.keys(this.userInfo).length !== 0) {
      this.userName = this.userInfo.user_info.first_name + ' ' + this.userInfo.user_info.last_name;
      this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
      const browserLang = this.translate.getBrowserLang();
      if (localStorage.getItem('lang') == 'Russia') {
        let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
        htmlTag.setAttribute('class', 'russia');
      }
    }
    this.readAndWritePermission();
  }
  checkUserAccess() {
    this.sp_menu = this.util.userAccess(constant.userAccess.sp_menu);
  }

  openMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu
  }

  logout() {
    sessionStorage.removeItem(constant.login_page.loginResponse);
    sessionStorage.removeItem(constant.login_page.logincredetials);
    this.router.navigate([constant.NAVIGATION.LOGIN]);
  }

  /** Raise & Issue Tracker */
  issueTracker() {
    this.router.navigate([constant.NAVIGATION.ISSUETRACKER]);
  }


  goHome() {
    this.router.navigate([constant.NAVIGATION.DASHBOARD]);
  }

  readAndWritePermission() {

    this.readAndWriteService.getUserReadAndWriteData().subscribe((resp: any) => {
      if (constant.NAVIGATION.HOME_PAGE == resp.data.home.home_page.link) {
        this.show_scenario_planner_card = resp.data.home.home_page.show_scenario_planner_card;
      }
      this.readAndWriteService.setShowHomePage(this.show_scenario_planner_card)
    }, (error) => {

    });

  }
}
