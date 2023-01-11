import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api.service';
import { ConstantService } from '../../services/constant.service';
import { ToastrService } from 'ngx-toastr';
import * as constant from '../../shared/constant/constant';
import { UtilService } from 'src/app/services/util.service';
import { constants } from 'os';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  //language translation
  //languageSelect: any = constant.login_page.languageList;
  selectedLanguage: any;
  incorrectValidation: boolean = false
  languageSelect: any = []

  //Form
  formObj: any = new FormData();
  loginForm!: FormGroup

  submitted = false;

  //Remember me
  is_remember: boolean = false;

  username: any;

  constructor(
    private util: UtilService,
    private router: Router,
    public apiService: ApiService,
    public constantService: ConstantService,
    private formbuilder: FormBuilder,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.errorNavigation()
    this.languageApiCall()
    this.loginFormcall();
    this.remembermeCall();


  }
  errorNavigation() {

    if (this.apiService.isAuthenticated()) {
      this.router.navigateByUrl(constant.NAVIGATION.HOME_PAGE)
    }
  }
  loginFormcall() {
    this.loginForm = this.formbuilder.group({
      email_login: new FormControl('', [Validators.required, Validators.pattern(constant.login_page.emailValid)]),
      pass_login: new FormControl('', [Validators.required]),
      is_remember: [false],
    });
  }

  languageApiCall() {
    this.apiService.languageDefault().subscribe((data: any) => {
      if (data.http_code == constant.login_page.reponseCode) {
        this.languageSelect = data.data;
        for (var i = 0; i < this.languageSelect.length; i++) {
          if (this.languageSelect[i].default_language == constant.login_page.kpichange) {
            this.languageCall(this.languageSelect[i].language_description)
          }
          sessionStorage.setItem(constant.login_page.currencyCode, this.languageSelect[i].currency_symbol)
        }
      }
    }, (error) => {
      this.toastr.error(error.error.data);
      //throw error;   //You can also throw the error to a global error handler
    })

  }

  get g() {
    return this.loginForm.controls;
  }

  //Remember me initial call

  remembermeCall() {
    if (this.constantService.getRemember() == 'true') {
      this.loginForm.controls.is_remember.setValue(true);
      this.loginForm.controls.email_login.setValue(this.constantService.getUsername());
      this.loginForm.controls.pass_login.setValue(this.constantService.getPassword());
    }
    else {
      this.loginForm.controls.is_remember.setValue(false);
      this.loginForm.value.email_login = '';
      this.loginForm.value.pass_login = '';
    }
  }

  //Language translation initial call

  languageCall(defaultLang: any) {
    // this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.constantService.setLanguageRussia(defaultLang);
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    }
  }

  //Language translation change function

  // onSelectionChange(event: any) {
  //   this.translate.use(event.value);
  //   this.constantService.setLanguage(event.value);
  // }

  signpayload() {

    this.submitted = true;
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.formObj.append(constant.login_page.email, this.loginForm.getRawValue().email_login);
    this.formObj.append(constant.login_page.password, this.loginForm.getRawValue().pass_login);

    this.username = this.loginForm.getRawValue().email_login;
    this.constantService.setUsername(this.username)

    this.signinApicall();

  }

  signinApicall() {
    this.apiService.login(this.formObj).subscribe((data: any) => {
      if (data.responseCode == constant.login_page.reponseCode) {
        sessionStorage.setItem(constant.login_page.loginResponse, JSON.stringify(data))
        sessionStorage.setItem(constant.login_page.logincredetials, JSON.stringify(this.loginForm.getRawValue()))
        this.router.navigate([constant.NAVIGATION.DASHBOARD]);
      }
    }, (error) => {
      if (error.error.status == constant.login_page.status) {
        this.incorrectValidation = true
      }

      //throw error;   //You can also throw the error to a global error handler
    })
  }

  //Login Function

  Signin() {
    this.signpayload();
  }

  //Remember me Functionality

  RememberMe(event: any) {
    if (this.is_remember) {
      return this.constantService.setRemember(event.checked);
    }
    else {
      this.constantService.removeUsername();
      this.constantService.removePassword();
      this.username = '';
      return this.constantService.setRemember(event.checked);
    }
  }

  spaceTrim() {
    this.loginForm.controls.email_login.setValue(this.loginForm.getRawValue().email_login.replace(/\s/g, ""));
  }

  //open forgotpassword page
  goForgetPasswordPage() {
    this.router.navigate([constant.NAVIGATION.FORGOT_PASSWORD_SCREEN])
  }

  emailChange(event: any) {
    this.incorrectValidation = false
  }
  passwordChange(event: any) {
    this.incorrectValidation = false
  }
}
