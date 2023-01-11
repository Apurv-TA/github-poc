import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import * as constant from '../../shared/constant/constant';
import { MustMatch } from './must-match.validator';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from '../../services/constant.service';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  //language translation
  languageSelect: any = constant.login_page.languageList;
  selectedLanguage: any;
  /** Form Variables */
  isValid: boolean = false;
  resetForm!: FormGroup;
  submitted = false;
  hide = true;

  /** Token Variables */
  resetToken: any
  /**Regex */
  unamePattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#!$%&*_])[A-Za-z\d@#!$%&*_]{8,15}$/

  constructor(private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    private toastr: ToastrService,
    private util: UtilService,
    public translate: TranslateService, public constantService: ConstantService,
    private router: Router) { }

  ngOnInit(): void {
    this.getResetToken()
    this.resetFormCall()
    this.languageApiCall()
  }


  /** Get Token from path Parametes */
  getResetToken() {
    this.activatedRoute
      .queryParams
      .subscribe((v: any) => {
        this.resetToken = v.token
      }
      );
  }

  /** Reset Form Initialization */
  resetFormCall() {

    this.resetForm = this.formbuilder.group({
      passwordNew: new FormControl('', [Validators.required, Validators.pattern(this.unamePattern)]),
      passwordConfirm: new FormControl('', [Validators.required])
    }, {
      validator: MustMatch('passwordNew', 'passwordConfirm')
    })
  }


  /** Payload Initialization */
  resetPayload() {
    this.submitted = true;
    if (this.resetForm.valid) {
      let formObj = {
        password: this.resetForm.getRawValue().passwordNew,
        token: this.resetToken
      }
      this.resetApiCall(formObj)
    }

  }

  /** Api Call to update the password */
  resetApiCall(formObj: any) {
    this.apiService.reset(formObj).subscribe((response: any) => {

      if (response.http_code == constant.login_page.reponseCode) {
        this.toastr.success(this.util.languageTranslator(constant.login_page.passworUpdateMessage));
        this.router.navigate([constant.NAVIGATION.LOGIN]);
      }
    }, (error) => {
      if (constant.login_page.error_code_500 == error.status) {
        this.toastr.error(this.util.languageTranslator(constant.login_page.invalidTokenWarningMss));
      } else if (constant.login_page.error_code_403 == error.status) {
        this.toastr.error(this.util.languageTranslator(constant.login_page.oldPasswordWarningMss));
      } else {
        this.toastr.error(this.util.languageTranslator(constant.login_page.invalidTokenWarningMss));
      }
    })
  }


  //Language translation initial call

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
      this.toastr.error(error.error.data);
      //throw error;   //You can also throw the error to a global error handler
    })

  }

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

  /** Navigate to home page */
  resetCancel() {
    this.router.navigate([constant.NAVIGATION.LOGIN]);
  }

  /** Form Initialize for validation */
  get resetFormControl() {
    return this.resetForm.controls;
  }
}