import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { UtilService } from 'src/app/services/util.service';
import * as constant from '../../shared/constant/constant';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorBaseAuthService implements HttpInterceptor {
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private basicAuthenticationService: ApiService,
     private router: Router,
     private util: UtilService,
     private activatedRoute: ActivatedRoute) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = this.basicAuthenticationService.getToken();
    let newReq = request.clone();
    if (!this.util.isNullOrEmptyOrUndefined(basicAuthHeaderString) 
    && this.router.routerState.snapshot.url!=constant.NAVIGATION.LOGIN
    && this.router.routerState.snapshot.url!=constant.NAVIGATION.RESET
    && this.router.routerState.snapshot.url!=constant.NAVIGATION.FORGOT) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + basicAuthHeaderString,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // need to do stuff with response
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.tokenSubject.next(null);
              // redirect to the login route
              // or show a modal
              sessionStorage.clear();
              this.router.navigate(['/login'])
              
            }
          }
        }
      )
    );
  }

}