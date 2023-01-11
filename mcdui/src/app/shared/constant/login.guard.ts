import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { constants } from 'buffer';
import { Observable } from 'rxjs';
import * as constant from '../../shared/constant/constant';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem(constant.login_page.loginResponse) == undefined){
        this.router.navigate([constant.NAVIGATION.LOGIN]);
        return false;
      }
     return true;
  }
  
}
