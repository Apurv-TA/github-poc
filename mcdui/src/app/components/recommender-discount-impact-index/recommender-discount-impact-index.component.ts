import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, OnChanges, SimpleChanges, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { OfferPackageDetailService } from '../../services/offer-package-detail.service';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/services/util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlSecurityService } from 'src/app/services/url-security.service';

@Component({
  selector: 'app-recommender-discount-impact-index',
  templateUrl: './recommender-discount-impact-index.component.html',
  styleUrls: ['./recommender-discount-impact-index.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RecommenderDiscountImpactIndexComponent implements OnInit, OnChanges {

  //Initial Variable Initializer
  offerConfigId: any;

  //Model PopUp
  selectedLanguage: any

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  tabIndex = 0;

  impactIndexForm: any = FormGroup;
  impact_index: any = FormArray;
  segmentImpactIndex: any = FormArray;
  closeResult: any;

  @ViewChild("impactModel") modalContent!: TemplateRef<any>;
  @Output() isSubmitted = new EventEmitter<any>();
  @Input('triggerImpactIndex') triggerImpactIndex: boolean = false;
  gc_val: any;
  netSaleval: any;
  marginVal: any;
  sumValidationShow: boolean = false;
  is_edit: boolean = false;

  constructor(public translate: TranslateService,
    public constantService: ConstantService,
    public offerPackageDetailService: OfferPackageDetailService,
    public utilService: UtilService,
    private modalService: NgbModal,
    public offerRecommenderService: OfferRecommenderService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService,
    private fb: FormBuilder, private dynamicFormService: DynamicFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private urlSecurityService: UrlSecurityService) { }


  /** Impact Index Popup */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.triggerImpactIndex) {
      this.modalService.open(this.modalContent, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
      this.baseApiLoader();
    } 
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return constant.login_page.pressEsc;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return constant.login_page.byClickBack;
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.document.body.classList.add(constant.scenario_planner.impact_index);
    
  }

  /** Popup Css Class */
  ngOnDestroy(): void {
    this.document.body.classList.remove(constant.scenario_planner.impact_index);
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
  //Initialize Api Call
  baseApiLoader() {
    this.offerConfigId = this.urlSecurityService.decryptUsingAES256(this.activatedRoute.snapshot.params[constant.login_page.offerId])
    this.otherUSerRestriction();
    this.createImpactIndexForm();
    this.getImpactIndexApiCall();
  }

  /** Other User Restriction */
  otherUSerRestriction() {
    let isEdit = JSON.parse(sessionStorage.getItem(constant.offer_package_detail.is_edit) || '{}')
    if (isEdit) {
      this.is_edit = false;
      this.checkUserAccess();
    } else {
      this.is_edit = true;
    }
  }

    /**Check User Read Access */
    checkUserAccess() {
       let isEdit = this.utilService.userAccess(constant.userAccess.impact_update_btn);
       if (isEdit) {
        this.is_edit = false;
       }else{
        this.is_edit = true;
       }
    }

  //Form Creation
  createImpactIndexForm() {
    this.impactIndexForm = this.fb.group({
      impact_index: this.fb.array([this.dynamicFormService.createImpactIndex()])
    })
  }

  /**Tab change  */
  changeTab(event: any) {
    this.tabIndex = event.index;
  }

  /** Reset Impact Index */
  resetImpactIndex() {
    return this.impactIndexForm.get(constant.offer_package_summary.impactIndex) as FormArray;
  }

  /** Add Impact Index */
  addImpactIndex() {
    this.segmentImpactIndex = this.impactIndexForm.get(constant.offer_package_summary.impactIndex) as FormArray;
    this.segmentImpactIndex.push(this.dynamicFormService.createImpactIndex());
  }

  /** Impact Index Patch Function */
  impaxIndexPatchFunction(indexData: any) {
    this.resetImpactIndex().clear();
    for (let i = 0; i < indexData.segment_weight_data.length; i++) {
      this.addImpactIndex();
    }
    this.impactIndexForm.patchValue({
      impact_index: indexData.segment_weight_data
    })
    let temp: any = [];
    temp = this.impactIndexForm.getRawValue().impact_index;
    this.sumofValidation()

  }

  /** Sum of Values Validation */
  sumofValidation() {
    for (var i = 0; i < this.impactIndexForm.getRawValue().impact_index.length; i++) {
      let result = parseFloat(this.impactIndexForm.getRawValue().impact_index[i].gc) + parseFloat(this.impactIndexForm.getRawValue().impact_index[i].net_sales) + parseFloat(this.impactIndexForm.getRawValue().impact_index[i].margin)
      if (result != constant.preview_page.one) {
        let rows = this.impactIndexForm.get(constant.offer_package_summary.impactIndex) as FormArray;
        rows.controls[i].patchValue({ is_validform: true });
      } else {
        let rows = this.impactIndexForm.get(constant.offer_package_summary.impactIndex) as FormArray;
        rows.controls[i].patchValue({ is_validform: false });
      }
    }
  }

  /** Get Impact Index Api Call */
  getImpactIndexApiCall() {
    this.offerPackageDetailService.getImpactIndexWeight(this.offerConfigId).subscribe((response: any) => {
      this.impaxIndexPatchFunction(response.data);
    }, (error) => {
    })
  }

  /**Save Impact Index */
  saveImpactIndexDTO() {
    this.modalService.dismissAll();
    if(this.router.url.includes(constant.NAVIGATION.SCENARIO_RESULTS)){
      this.saveScenarioImpactIndexWeight();
    }else{
      this.saveImpactIndexAPICall();
    }
    

  }

  /** Save Impact Index Payload */
  saveImpactIndexPayload() {
    let temp: any = [];
    temp = this.impactIndexForm.getRawValue().impact_index;
    var payload = {
      offer_config_id: this.offerConfigId,
      segment_weight_data: temp
    }
    return payload
  }

  /**Save Impact Index Api Call */
  saveImpactIndexAPICall() {
    this.offerPackageDetailService.saveImpactIndexWeight(this.saveImpactIndexPayload()).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.isSubmitted.emit(response.data);
        this.toastr.success(this.utilService.languageTranslator(constant.issueTracker.weightUpdateSuccess));
        this.modalService.dismissAll();
      }
    }, (error) => {
    })
  }

  
  /**Save Scenario Impact Index Api Call */
  saveScenarioImpactIndexWeight() {
    this.offerPackageDetailService.saveScenarioImpactIndexWeight(this.saveImpactIndexPayload()).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.isSubmitted.emit(response.data);
        this.toastr.success(this.utilService.languageTranslator(constant.issueTracker.weightUpdateSuccess));
        this.modalService.dismissAll();
      }
    }, (error) => {
    })
  }

  /** Get GC Value */
  sumGcValue() {
    this.sumofValidation();
  }
  /** Get Net Sales Value */
  sumNetSalesValue() {
    this.sumofValidation();
  }
  /** Get Margin Value */
  sumMarginValue() {
    this.sumofValidation();
  }

  /** Disable Submit Button */
  validateImpactIndex() {
    let isvalidImapctIndex: boolean = false;
    if (this.impactIndexForm.invalid) {
      isvalidImapctIndex = true;
    } else if (this.impactIndexForm.valid) {
      for (let i = 0; i < this.impactIndexForm.getRawValue().impact_index.length; i++) {
        if (this.impactIndexForm.getRawValue().impact_index[i].is_validform) {
          isvalidImapctIndex = true;
          break;
        }
      }
    }
    return isvalidImapctIndex;
  }

  /**Copy Impcat Index Weight Values */
  copyIndexValues(index: any) {
    let copyData = this.impactIndexForm.getRawValue().impact_index[index];
    for (let i = 0; i < this.impactIndexForm.getRawValue().impact_index.length; i++) {
      let rows = this.impactIndexForm.get(constant.offer_package_summary.impactIndex) as FormArray;
      rows.controls[i].patchValue({ gc: copyData.gc });
      rows.controls[i].patchValue({ net_sales: copyData.net_sales });
      rows.controls[i].patchValue({ margin: copyData.margin });
    }
    this.toastr.success(this.utilService.languageTranslator(constant.issueTracker.weightUpdateSuccessMsg));
    this.sumofValidation();
  }

}
