
/* Angular Pre-Defined Components */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Http Client and Translation */
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpInterceptorBaseAuthService } from './components/Auth/token.interceptor';



/** routing configuration */
import { AppRoutingModule, routingComponents } from './app-routing.module';

/** user defined components */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TopNavbarComponent } from './components/layout/top-navbar/top-navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

/** Third Party Components */
import { ToastrModule } from 'ngx-toastr';
import { environment as ENV } from '../environments/environment';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, NgxUiLoaderHttpModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { HelpComponent } from './components/help/help.component';
import { RaiseIssueTrackerComponent } from './components/raise-issue-tracker/raise-issue-tracker.component';
import { PendingIssueComponent } from './components/pending-issue/pending-issue.component';
import { ClosedIssueComponent } from './components/closed-issue/closed-issue.component';
import { ViewKpiComponent } from './components/view-kpi/view-kpi.component';
import { MatSortModule } from '@angular/material/sort';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#FFBC0D',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  fgsType: SPINNER.squareJellyBox,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  logoPosition: "center-center",
  logoSize: 50,
  logoUrl: "assets/images/arches.png",
};




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    TopNavbarComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HelpComponent,
    RaiseIssueTrackerComponent,
    PendingIssueComponent,
    ClosedIssueComponent,
    ViewKpiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatSortModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorBaseAuthService,
      multi: true
    }, DatePipe],
  bootstrap: [AppComponent]
})


export class AppModule { }


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
