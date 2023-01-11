import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as constant from '../../shared/constant/constant';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/app/services/util.service';
import { ConstantService } from 'src/app/services/constant.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  //language translation
  languageSelect: any = constant.login_page.languageList;
  selectedLanguage: any;
  /** form Variables */
  forgotForm!: FormGroup
  submitted = false;
  supprtEmail: any;
  constructor(private util: UtilService, public constantService: ConstantService, public translate: TranslateService, private formbuilder: FormBuilder, public apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.forgotFormCall()
    this.languageApiCall()
    this.supportEmail()
  }

  /** Form Initialize for validation */
  get forgotFormControl() {
    return this.forgotForm.controls;
  }

  /** Forgot Password form Initialization */
  forgotFormCall() {
    this.forgotForm = this.formbuilder.group({
      emailForgot: new FormControl('', [Validators.required, Validators.pattern(constant.login_page.emailValid)]),
    })
  }

  /** Payload Initialization */
  forgotPayLoad() {
    this.submitted = true;
    if (this.forgotForm.valid) {
      let formObj = {
        email: this.forgotForm.getRawValue().emailForgot
      }

      this.forgotApicall(formObj)
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

  languageApiCall() {
    this.apiService.languageDefault().subscribe((data: any) => {
      if (data.http_code == constant.login_page.reponseCode) {
        this.languageSelect = data.data
        for (var i = 0; i < this.languageSelect.length; i++) {
          if (this.languageSelect[i].default_language == constant.login_page.kpichange) {
            this.languageCall(this.languageSelect[i].language_description)
          }
        }
      }
    }, (error) => {

      //throw error;   //You can also throw the error to a global error handler
    })

  }

  //Language translation change function

  // onSelectionChange(event: any) {
  //   this.translate.use(event.value);
  //   this.constantService.setLanguage(event.value);
  // }
  /** Api call to sent reset link */
  forgotApicall(formObj: any) {
    this.apiService.forgot(formObj).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.toastr.success(this.util.languageTranslator(constant.login_page.passworResetMessage));
        this.router.navigate([constant.NAVIGATION.LOGIN]);
      }
    }, (error) => {
      if (constant.login_page.error_code_400 == error.status) {
        this.toastr.error(this.util.languageTranslator(constant.login_page.noActiveEmailIdWarningMss));
      }
    })
  }

  /** Navigate to home page */
  forgotCancel() {
    this.router.navigate([constant.NAVIGATION.LOGIN]);
  }

  /** Support Email */
  supportEmail() {
    this.apiService.supportEmail().subscribe((data: any) => {
      this.supprtEmail = data.data.support_email;
    })
  }
}
