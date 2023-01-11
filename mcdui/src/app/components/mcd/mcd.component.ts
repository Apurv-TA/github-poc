import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as constant from '../../shared/constant/constant';
import { UtilService } from 'src/app/services/util.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-mcd',
  templateUrl: './mcd.component.html',
  styleUrls: ['./mcd.component.scss']
})
export class McdComponent implements OnInit {
  userAccess: any;
  sp_grid: boolean = false;
  user_Access: boolean = false;

  constructor(public apiService: ApiService, private util: UtilService, private router: Router) { }

  ngOnInit(): void {
    
     this.checkUserAccess();
  }

  /** Checking User Access */
  checkUserAccess() {
    this.apiService.userAccess().subscribe((data: any) => {
      this.userAccess = data.data;
      sessionStorage.setItem(constant.userAccess.user_Access, JSON.stringify(this.userAccess));
      this.user_Access = true;
      if (this.apiService.isAuthenticated() && !this.util.userAccess(constant.userAccess.sp_menu)) {
        this.router.navigateByUrl(constant.NAVIGATION.DASHBOARD)
      }
    })
  }

}
