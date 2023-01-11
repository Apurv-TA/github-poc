import { Component, OnInit, EventEmitter, AfterViewInit, Input, ViewChild, Output, RendererStyleFlags2, ChangeDetectorRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OfferRecommenderService } from '../../services/offer-recommender.service';
import * as constant from '../../shared/constant/constant';
import { OfferConfiguration } from '../../shared/interface/offerConfig';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { UtilService } from '../../services/util.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConstantService } from 'src/app/services/constant.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { DatePipe } from '@angular/common';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { OfferPackageDetailService } from '../../services/offer-package-detail.service';
import { MatInput } from '@angular/material/input';
import { MatDatepicker } from '@angular/material/datepicker';
import { ScenarioNameService } from 'src/app/services/scenario-name.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-offer-configuration',
  templateUrl: './offer-configuration.component.html',
  styleUrls: ['./offer-configuration.component.scss'],
})
export class OfferConfigurationComponent implements OnInit, AfterViewInit {
  @ViewChild('addedit') editModal: any;
  @ViewChild('copyPopUp') copyModal: any;
  /** Segment setting */
  segmentDropdownSettings = {
    "primaryKey": "ohm_code",
    "labelKey": "coop_name",
    "text": "Select Business Unit",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "classes": "myclass custom-class",
    "enableSearchFilter": true,
    "badgeShowLimit": 3,
    "position": "bottom",
    "disabled": false
  }
  /** Apply Configuration */
  applySegementList: any = [];
  applySegementListDeal: any = [];
  applySegementListValue: any = [];
  applyConfiguration: any;
  selectedApplyConfiguration: any = [];
  applyDropdownSettings: any = {
    "primaryKey": "child_ohmID",
    "labelKey": "coopName",
    "text": "Select Apply",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "classes": "myclass custom-class",
    "enableSearchFilter": true,
    "badgeShowLimit": 1,
    "position": "bottom"
  }

  /** date  */
  @ViewChild('startdatee', {
    read: MatInput
  }) startdatee!: MatInput;
  expand = new EventEmitter();


  /** Duration */
  durMinValue: any;
  durMaxValue: any;
  check_st_date: any;
  check_end_date: any;
  check_duration: any;
  act_stdate: any;
  act_enddate: any;

  /** Offer Form Variables */
  offerConfigurationForm: any = FormGroup;
  disp: boolean = false;

  /** Offer Configuration variables */
  configList: any = {};
  minDate: any;
  promoChannelList: any = []
  // to be fixed after demo
  coopName: string = '';
  subSegment_coop_name: string = '';
  startDate: any = '';
  duration: any = '';
  child_ohmID: any;
  segmentList: any = [];
  selectedItemList: any;
  fixed_Promo: any = [];
  editableSegmentIndex: any
  offerConfiguration: OfferConfiguration = {} as OfferConfiguration;
  selectedGeoList: any = [];
  /** objective */
  maximizeList: any = [];
  selSegment: any = [];
  finalSelSegmentIndex: any;         //need to check and remove

  /** From Variables */
  lower_bound: any = FormArray;
  objective: any = FormGroup;
  max_offers: any = FormArray;
  daypart: any = FormArray;
  competition_discounts: any = FormArray;
  isDisable: boolean = false;
  isDisabledd: boolean = false;
  isDisableddd: boolean = false;

  /**Username */
  userName: any;
  userInfo: any = {};


  /** Product Drop Down Setting */
  productDropdownSettings: any = {
    "primaryKey": "category_id",
    "labelKey": "category",
    "text": "Select Category",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "classes": "myclass custom-class",
    "enableSearchFilter": true,
    "badgeShowLimit": 1,
    "position": "bottom",
    "disabled": true
  }

  product_item: any = [];
  productList: any = []
  productListItems: any = [];
  promoMechChannelListItems: any = [];
  selectedProductList: any = []
  selectedPromoList: any = [];
  maxOffersList: any = [];
  dayPartOffersList: any = [];

  /** Item */
  itemList: any = []
  restructureItem = new Map();
  itemdropdownSettings: any = {
    "primaryKey": "item_id",
    "labelKey": "item_name",
    "text": "Select Items",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "classes": "myclass custom-class",
    "enableSearchFilter": true,
    "badgeShowLimit": 1,
    "position": "bottom",
    "disabled": true
  }
  dayPartSetting = {
    "primaryKey": "dayPart_id",
    "labelKey": "dayPart_name",
    "text": "Select Items",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "classes": "myclass custom-class",
    "enableSearchFilter": true,
    "badgeShowLimit": 1,
    "position": "bottom",
    "disabled": true
  }

  /** Offer */
  promoMechChannelList: any = []

  promoMechanicdropdownSettings: any = {
    "primaryKey": "promomech_id",
    "labelKey": "promomech_name",
    "text": "Select Discount Mechanic",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "classes": "myclass custom-class",
    "enableSearchFilter": true,
    "badgeShowLimit": 1,
    "position": "bottom",
    "disabled": true
  }

  offers_list: any = {};
  offer_config_dictionary: any = {};
  preview_config: any = [];

  /** Router Configuration */
  private getRouteParams: any;

  /** Slider Variables */
  disCountValue: any;
  disCountHighValue: any;
  disCountValue_two: any;
  disCountHighValue_two: any;

  offerValue: any
  offerHighValue: any

  durationValue: any;
  durationHighValue: any;

  disvountoptions: Options = {
    floor: 0,
    ceil: 0,
    hideLimitLabels: false,
    hidePointerLabels: true
  };
  disvountoptions_two: Options = {
    floor: 0,
    ceil: 0,
    hideLimitLabels: false,
    hidePointerLabels: true
  };

  dayPartList: any = [];
  durationOptions: Options = {
    floor: 0,
    ceil: 0,
    hideLimitLabels: false,
    hidePointerLabels: true
  };

  offeroptions: Options = {
    floor: 0,
    ceil: 0,
    hideLimitLabels: false,
    hidePointerLabels: true
  };
  offer_config_prev: any;

  /** validation parameters*/
  isPreviewScreen: boolean = false;
  isCopyScreen: boolean = false;

  /** Model Variable */
  closeResult: any;
  selectedLanguage: any
  offerConfigId: any;

  /** Competition Discounts */
  brandList: any;
  discountList: any;
  discountDepthList: any;
  offer_config_save: any;
  brand_name: any;
  dis_list: any;

  /*Note variables */
  segmentNote: any
  discountNote: any;
  parent_ohm_id: any;

  /** update */
  check: boolean = false;
  national_check: boolean = false;
  noofpromos_min: any;
  noofpromos_max: any;
  min_depth_1: any;
  max_depth_1: any;
  min_depth_2: any;
  max_depth_2: any;

  constructor(public translate: TranslateService,
    public offerRecommenderService: OfferRecommenderService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private dynamicFormService: DynamicFormService,
    public constantService: ConstantService,
    private utils: UtilService,
    private modalService: NgbModal,
    private urlSecurityService: UrlSecurityService,
    private datepipe: DatePipe,
    public offerPackageDetailService: OfferPackageDetailService,
    private changeDetectorRef: ChangeDetectorRef,
    public scenarioservice: ScenarioNameService) {
    translate.addLangs(['English', 'Russia'])
  }

  ngOnInit(): void {
    this.checkUserAccess()
    this.getGeoData();
    this.getActiveRouteParamsValue()
    this.initialLanguageCall()
    this.formGroup();
  }
  // geolist: any = '';
  SelectedGeo: any = [];
  getGeoData() {
    this.offerRecommenderService.getGeoList().subscribe((response: any) => {
      this.promoChannelList = response.data;
      if (this.promoChannelList.length == 1 && this.promoChannelList[0].coop_name == 'National') {
        this.national_check = true;
        this.geolistappend.push(this.promoChannelList[0].ohm_id);
        this.getCoopList();
      }

    }, (error) => {
      this.toastr.error(error.error.data);
    });
  }

  geo_filter() {
    if (this.history) {
      let temp: any = [];
      for (let i = 0; i < this.geolistappend.length; i++) {
        let flag = 0;
        for (let j = 0; j < this.history.length; j++) {
          if (this.history[j]['ohm_id'] == this.geolistappend[i]) {
            flag = 1;
          }
        }
        if (!flag) {
          temp.push(this.geolistappend[i]);
        }
      }
      return temp;
    }
    return this.geolistappend;
  }
  geo_rem_filter() {
    if (this.history) {
      for (let i = 0; i < this.history.length; i++) {
        let flag = 0;
        for (let j = 0; j < this.geolistappend.length; j++) {
          if (this.history[i]['ohm_id'] == this.geolistappend[j]) {
            flag = 1;
            break;
          }
        }
        if (!flag && this.segmentList[i] != false) {
          let confirmation = confirm("Are You Sure you want to delete " + this.history[i]['coop_name']);
          if (confirmation) {
            for (let j = this.applySegementListDeal.length - 1; j >= 0; j--) {
              let coop = this.removeLastWord(this.applySegementListDeal[j].coopName);
              if (coop == this.history[i]['coop_name']) {
                this.applySegementListDeal.splice(j, 1);
                this.applySegementListValue.splice(j, 1);
              }
            }
            this.segmentList[i] = false;
            this.history[i] = false;
          }
        }
      }
      this.segmentList = this.segmentList.filter((item: any, index: any) => this.segmentList.indexOf(item) === index);
      this.history = this.history.filter((item: any, index: any) => this.history.indexOf(item) === index);
    }
  }

  removeLastWord(str: any) {
    let lastIndexOfSpace = str.lastIndexOf(" ");
    if (lastIndexOfSpace === -1) {
      return str;
    }
    return str.substring(0, lastIndexOfSpace);
  }

  history: any;
  exp: boolean = false;
  getCoopList() {
    let param = this.geo_filter();
    param.toString();
    this.geo_rem_filter();
    if (param.length > 0) {
      this.offerRecommenderService.getCoopList(param).subscribe((response: any) => {
        this.segmentList = [...this.segmentList, ...response.data];
        this.history = this.segmentList;
        this.exp = true;
      }, (error) => {
        this.toastr.error(error.error.data);
      });
    }
  }


  /** Get Active Route Values */
  getActiveRouteParamsValue() {
    this.getRouteParams = this.activeRouter.params.subscribe(params => {
      if (undefined != params[constant.OFFER_CONFIGURATION.preview] &&
        params[constant.OFFER_CONFIGURATION.preview] == constant.OFFER_CONFIGURATION.preview) {
        this.isPreviewScreen = true;
        this.offerConfiguration = JSON.parse(sessionStorage.getItem(constant.preview_page.getPreview) || '{}')
        if (this.offerConfiguration.is_copy) {
          this.isCopyScreen = true;
        }
        this.getConfigurationApiCall();
      } else if (undefined != params[constant.OFFER_CONFIGURATION.preview] && params[constant.OFFER_CONFIGURATION.preview] != constant.OFFER_CONFIGURATION.preview) {
        this.isPreviewScreen = true;
        this.offerConfigId = this.urlSecurityService.decryptUsingAES256(this.activeRouter.snapshot.params[constant.OFFER_CONFIGURATION.preview]);
        this.editOfferService(this.offerConfigId);
      } else if (undefined != params[constant.OFFER_CONFIGURATION.type] &&
        params[constant.OFFER_CONFIGURATION.type] == constant.OFFER_CONFIGURATION.copy) {
        this.isPreviewScreen = false;
        this.isCopyScreen = false;
        this.offerConfigId = this.urlSecurityService.decryptUsingAES256(this.activeRouter.snapshot.params[constant.OFFER_CONFIGURATION.offerId]);
        this.editOfferService(this.offerConfigId);
      } else {
        this.isPreviewScreen = false;
        this.getConfigurationApiCall()
      }
    });
  }

  /** configuraton service call */
  getConfigurationApiCall() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.configList = {
        offer_config_start_date_value: "1",
        offer_config_end_date_value: "30",
        lower_bond_perc: "0",
        set_max_offer_default: "10",
        set_dayPart_offer_default: "10",
        discount_depth_range_min: "20",
        discount_depth_min: "10",
        discount_depth_max: "100",
        no_of_offer_range_min: "5",
        no_of_offer_min: "1",
        no_of_offer_max: "10",
        competition_min_depth: "10",
        competition_max_depth: "45",
        competition_default_depth: "23",
        no_of_offer_range_max: "7",
        discount_depth_range_max: "50",
        default_min_start_date: "1",
        default_max_start_date: "30",
        support_email: "support.pricepromotion@mcdpricing.com",
        created_at_date: "1",
        faq_link: "https://collaborate.mcd.com/:b:/s/Segmentedoffers_Russia/ETushkNCA2RPtYP-9c0D1IwBSNICO2l0m6n8xVC_nxBWuw?e=aw1ZgX",
        user_manual: "https://collaborate.mcd.com/:b:/s/Segmentedoffers_Russia/Ee-sx5qOuChJrZap1HTYWxABK7JC0MBwUOUYZ4dEAbROCw?e=8XTC5E",
        training_video: "https://collaborate.mcd.com/:f:/s/Segmentedoffers_Russia/EqrcKPg4YltGo5Vih8V-MoEBmk5QHjaJg2MRvvLlQYeRWg?e=u5v48W"
      };
      // Setting default Rang
      this.setDiscountMaxValue1(this.configList.discount_depth_min, this.configList.discount_depth_max, this.configList.discount_depth_range_min, this.configList.discount_depth_range_max);
      this.setDiscountMaxValue2(this.configList.discount_depth_min, this.configList.discount_depth_max, this.configList.discount_depth_range_min, this.configList.discount_depth_range_max);
      this.setDurationMaxValue(1, 10, 1, 4);
      this.setNoOffers(this.configList.no_of_offer_min, this.configList.no_of_offer_max, this.configList.no_of_offer_range_min, this.configList.no_of_offer_range_max);
      this.getMaxOffers(this.configList.set_max_offer_default);
      this.getDayPartOffers(this.configList.set_dayPart_offer_default);
      // Setting form
      this.createOfferConfigurationForm();

      //   }
    }, (error) => {
      this.toastr.error(error.error.data);
    })
  }

  // Edit Offer Service
  editOfferService(offer_config_id: number) {
    this.offerRecommenderService.getCopyPackageService(offer_config_id).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.validateEditOfferConfiguration(response);
      }
    }, (error) => {
      this.showItemModel(this.copyModal);
    })
  }

  summaryNavigation() {
    this.modalService.dismissAll();
    this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
  }

  /** Intial Language Call And setup */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  // Check User Access
  checkUserAccess() {
    this.offer_config_prev = this.utils.userAccess(constant.userAccess.offer_config_prev);
    this.offer_config_save = this.utils.userAccess(constant.userAccess.offer_config_save)
  }

  /** From Creation */
  createOfferConfigurationForm() {
    this.offerConfigurationForm = this.fb.group({
      start_date: new FormControl('', [Validators.required]),
      search: new FormControl(''),
      promo_channel: new FormControl([], [Validators.required]),
      offer_duration: new FormControl(2, [Validators.required]),
      offer_package_name: new FormControl('', [Validators.maxLength(100)]),
      competition_discounts: this.fb.array([this.dynamicFormService.createCompetitionDiscounts()]),
      objective: this.fb.group({
        maximize: new FormControl('', [Validators.required]),
        lower_bound: this.fb.array([this.dynamicFormService.createLowerBond()])
      }),
      product: this.fb.group({
        product_item: new FormControl([], Validators.required),
        item: new FormControl([], Validators.required),
        max_offers: this.fb.array([this.dynamicFormService.createMaxOffers()]),
      }),
      offer: this.fb.group({
        promo_mechanic: new FormControl([], Validators.required),
        no_of_offers: new FormControl([this.configList.no_of_offer_range_min, this.configList.no_of_offer_range_max], Validators.required),
        discount_depth: new FormControl([this.configList.discount_depth_range_min, this.configList.discount_depth_range_max], Validators.required),
        discount_depth_two: new FormControl([20, this.configList.no_of_offer_range_max], Validators.required),
        daypart: this.fb.array([this.dynamicFormService.createDayPart()]),
      }),
      period: this.fb.group({
        period_start_date: new FormControl('', [Validators.required]),
        period_duration: new FormControl([1, 4], Validators.required),
      })
    })
  }

  /**Calendar */
  minDateee: any;
  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      if (!date) {
        return false;
      }
      this.minDateee = new Date(Date.now());
      let dat = new Date(date);
      const day = dat.getDay();
      return day == 1;       // 1 implies monday, 0 implies sunday, etc.
    };

  /** Competition Discount */

  getComDisBrandService() {
    this.offerRecommenderService.getComDisBrandService().subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.brandList = response.data;
      }
    }, error => {

    })
  }

  getComDiscountsService() {
    this.offerRecommenderService.getComDiscountsService().subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.discountList = response.data;
      }
    }, error => {

    })
  }

  /** patch product value in form */
  patchComDisDefaultValues() {
    let competitionDiscount: any = {};
    competitionDiscount = this.getDefaultValue(constant.OFFER_CONFIGURATION.COMPETITION_DISCOUNTS);
    this.resetCompDiscount().clear();
    for (let i = 0; i < competitionDiscount.length; i++) {
      this.addCompetitionDiscounts();
    }
    this.offerConfigurationForm.patchValue({
      competition_discounts: competitionDiscount
    })
  }

  /** discount value validation */
  setDiscountMaxValue1(min: any, max: any, range_min: any, range_max: any) {
    this.disCountValue = range_min;
    this.disCountHighValue = range_max;

    this.disvountoptions = {
      floor: min,
      ceil: max,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.disCountValue = value
            return value + '%';
          case LabelType.High:
            this.disCountHighValue = value
            return value + '%';
          default:
            return value + '%';
        }
      }
    }
  }
  /** discount value validation */
  setDiscountMaxValue2(min: any, max: any, range_min: any, range_max: any) {
    this.disCountValue_two = range_min;
    this.disCountHighValue_two = range_max;

    this.disvountoptions_two = {
      floor: min,
      ceil: max,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.disCountValue_two = value
            return value + '%';
          case LabelType.High:
            this.disCountHighValue_two = value
            return value + '%';
          default:
            return value + '%';
        }
      }
    }
  }

  /** discount value validation */
  setDurationMaxValue(min: any, max: any, range_min: any, range_max: any) {
    this.durationValue = range_min;
    this.durationHighValue = range_max;

    this.durationOptions = {
      floor: min,
      ceil: max,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.durationValue = value;
            return value + '';
          case LabelType.High:
            this.durationHighValue = value;
            return value + '';
          default:
            return value + '';
        }
      }
    }
  }

  /** validation for discount value slider */
  setNoOffers(min: any, max: any, rang_min: any, rang_max: any) {
    this.offerValue = rang_min;
    this.offerHighValue = rang_max;
    this.offeroptions = {
      floor: min,
      ceil: max,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            this.offerValue = value
            return value + '';
          case LabelType.High:
            this.offerHighValue = value
            return value + '';
          default:
            return value + '';
        }
      }
    }
  }

  /** get Max offer list */
  getMaxOffers(maxvalue: any) {
    for (var i = 1; i <= maxvalue; i++) {
      this.maxOffersList.push({ id: i })
    }
  }
  /** get Max offer list */
  getDayPartOffers(maxvalue: any) {
    for (var i = 1; i <= maxvalue; i++) {
      this.dayPartOffersList.push({ id: i })
    }
  }

  /** Dynamic Lower Bond Form Update */
  addLowerBond(): void {
    this.lower_bound = this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.OBJECTIVE_FORM_NAME).get(constant.OFFER_CONFIGURATION.LOWER_BOUND_FORM_NAME) as FormArray;
    this.lower_bound.push(this.dynamicFormService.createLowerBond());
  }

  /** remove Lower Bond Form update */
  removeLowerBond(index: number): void {
    this.lower_bound.removeAt(index);
    this.updateOfferConfiguration();
  }

  /** Dynamic Max Offers Form Update */
  addMaxOffer(): void {
    this.max_offers = this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.PRODUCT_FORM_NAME).get(constant.OFFER_CONFIGURATION.MAX_OFFERS_FORM_NAME) as FormArray;
    this.max_offers.push(this.dynamicFormService.createMaxOffers());
  }
  /** Dynamic Max Offers Form Update */
  addDatPart(): void {
    this.daypart = this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.OFFER_FORM_NAME).get(constant.OFFER_CONFIGURATION.DAY_PART_FORM_NAME) as FormArray;
    this.daypart.push(this.dynamicFormService.createDayPart());
  }

  /** remove Max Offers Form update */
  removeMaxOffer(index: number): void {
    this.max_offers.removeAt(index);
    this.updateOfferConfiguration();
  }
  /** remove Max Offers Form update */
  removeDayPart(index: number): void {
    this.daypart.removeAt(index);
    this.updateOfferConfiguration();
  }

  /** remove Max Offers Form update */
  addCompetitionDiscounts(): void {
    this.competition_discounts = this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.COMPETITION_DISCOUNTS) as FormArray;
    this.competition_discounts.push(this.dynamicFormService.createCompetitionDiscounts());
  }

  /** remove Max Offers Form update */
  removeCompetitionDiscounts(index: number): void {
    this.competition_discounts.removeAt(index);
    this.updateOfferConfiguration();
  }

  addWeeks(numOfWeeks: any, date = new Date()) {
    date.setDate(date.getDate() + numOfWeeks * 7);
    return date;
  }

  /** Interface update */
  updateOfferConfiguration() {
    this.offerConfigurationInterface();
  }

  /** Parent Level Upate in Offer structure */
  offerConfigurationInterface() {
    let low_bound: any = [];
    let prod_cat: any = [];
    let max_prod_cat: any = [];
    let max_day_part: any = [];
    let promo_mech: any = [];
    this.offerConfiguration = this.offerConfigurationForm.getRawValue();
    this.offerConfiguration.start_date = this.selected_coop?.data?.start_date || '';
    this.offerConfiguration.offer_duration = this.selected_coop?.data?.duration_max;
    this.offerConfiguration.duration = [this.selected_coop?.data?.duration_min, this.selected_coop?.data?.duration_max];
    this.offerConfiguration.promo_channel = this.offerConfigurationForm.getRawValue().promo_channel;
    this.offerConfiguration.offer_package_name = this.offerConfigurationForm.getRawValue().offer_package_name;
    let obj = this.offerConfigurationForm.getRawValue().objective;
    let prod = this.offerConfigurationForm.getRawValue().product;
    let offer = this.offerConfigurationForm.getRawValue().offer;
    this.check_st_date = new Date(this.offerConfiguration.start_date);
    this.check_duration = this.offerConfiguration.offer_duration;
    this.check_end_date = this.addWeeks(this.check_duration, new Date(this.offerConfiguration.start_date));
    // let comp_discounts = this.offerConfigurationForm.getRawValue().competition_discounts;
    // //competition discounts
    // this.brand_name = comp_discounts[comp_discounts.length -1].competition_brand_id;
    // for(let i=0;i<this.discountList.length;i++){
    //   if(this.discountList[i].competition_offer_brand===this.brand_name){
    //     this.dis_list=this.discountList[i].brand_discounts;
    //   }
    // }
    // // console.log('comp_discounts: ',comp_discounts);
    // for(let i=0;i<comp_discounts.length;i++){
    //   this.compe_discs.push({
    //     "brandName":comp_discounts[i].competition_brand_id,
    //     "promo":comp_discounts[i].competition_offer_id,
    //     "depth":comp_discounts[i].discount_depth
    // });
    // }
    // this.offerConfiguration.competition_discounts = this.compe_discs;
    //product categories
    let temp = prod.product_item;
    if (temp) {
      for (let i = 0; i < temp.length; i++) {
        prod_cat.push(temp[i].category);
      }
      this.offerConfiguration.product_categories = prod_cat;
    }
    //promo mechanics
    temp = offer.promo_mechanic;
    if (temp) {
      for (let i = 0; i < temp.length; i++) {
        promo_mech.push(temp[i].promomech_id);
      }
      this.offerConfiguration.promo_mechanics = promo_mech;
    }
    //maximum product categories
    temp = prod.max_offers;
    for (let i = 0; i < temp.length; i++) {
      max_prod_cat.push({ "max_value": temp[i].max_offer, "product_category": temp[i].product_item });
    }
    this.offerConfiguration.maximum_product_categories = max_prod_cat;
    //maximum daypart
    temp = offer.daypart;
    for (let i = 0; i < temp.length; i++) {
      max_day_part.push({ "name": temp[i].dayPart_item, "max_value": temp[i].dayPart_offer });
    }
    this.offerConfiguration.maximum_day_part = max_day_part;
    //Objective Lower bound
    temp = obj.lower_bound;
    if (temp.length > 0) {
      for (let i = 0; i < temp.length; i++) {
        let x = temp[i].lower_bound_name;
        let y = temp[i].lower_bound_percentage;
        let dict: any = {};
        dict[x as keyof typeof dict] = y;
        low_bound.push(dict);
      }
    }
    this.offerConfiguration.object_lower_bound = low_bound;
    this.offerConfiguration.segment = this.selSegment;
    this.offerConfiguration.child_ohm_id = this.child_ohmID;
    this.offerConfiguration.coop_name = this.coopName;
    this.offerConfiguration.promo_type = this.subSegment_coop_name;
    this.offerConfiguration.parent_ohm_id = this.parent_ohm_id;
    this.offerConfiguration.fixed_promos = this.fixed_Promo;
    this.offerConfiguration.fixed_promo_called = this.actcall;
    this.updateSelectedCoopdata();
    this.offer_config_dictionary[this.child_ohmID] = this.offerConfiguration;
  }

  updateSelectedCoopdata() {
    //Selected coop Data
    let obj_low_bound: any = [];
    let obj = this.offerConfigurationForm.getRawValue().objective;
    let prod = this.offerConfigurationForm.getRawValue().product;
    let offer = this.offerConfigurationForm.getRawValue().offer;

    if (this.selected_coop) {
      this.selected_coop.data.start_date = this.offerConfiguration.start_date;
      this.selected_coop.data.duration_min = this.selected_coop.data.duration_min;
      this.selected_coop.data.duration_max = this.selected_coop.data.duration_max;
      this.selected_coop.data.objective_list = JSON.parse(JSON.stringify(this.offerConfigurationForm.getRawValue().objective));
      this.selected_coop.data.promo_list = JSON.parse(JSON.stringify(this.offerConfigurationForm.getRawValue().offer));
      this.selected_coop.data.maxi_list = this.maximizeList;
      this.selected_coop.data.objective = this.selected_coop.data.objective;
      for (let j = 0; j < obj.lower_bound.length; j++) {
        for (let i = 0; i < this.selected_coop.data.objective_lower_bound.length; i++) {
          if (obj.lower_bound[j].lower_bound_name == this.selected_coop.data.objective_lower_bound[i].desc) {
            obj_low_bound.push(obj.lower_bound[j]);
            break;
          }
        }
      }
      this.selected_coop.data.obj_low_bound = obj_low_bound;
      let pro_cat = [];
      for (let i = 0; i < prod.product_item.length; i++) {
        pro_cat.push(prod.product_item[i].category);
      }
      this.selected_coop.data.product_categories = pro_cat;
      this.selected_coop.data.item = this.selected_coop.data.item;
      this.selected_coop.data.n_promos_product_categories = this.selected_coop.data.n_promos_product_categories;
      this.selected_coop.data.prod = JSON.parse(JSON.stringify(this.offerConfigurationForm.getRawValue().product));
      this.selectedItemList = this.selected_coop.data.prod.item;
      this.selectedProductList = this.selected_coop.data.prod.product_item;
      this.selected_coop.data.selectedItemList = this.selectedItemList;
      this.selected_coop.data.selectedProductList = this.selectedProductList;
      this.selected_coop.data.daypart = this.selected_coop.data.daypart;
      let pro_mec = [];
      for (let j = 0; j < offer.promo_mechanic.length; j++) {
        for (let i = 0; i < this.promoMechChannelListItems.length; i++) {
          if (offer.promo_mechanic[j].promomech_id == this.promoMechChannelListItems[i].promomech_id) {
            pro_mec.push(this.promoMechChannelListItems[i]);
            break;
          }
        }
      }
      this.selectedPromoList = pro_mec;
      this.selected_coop.data.selectedPromoList = this.selectedPromoList;
      this.selected_coop.data.promo_mechanics = this.selected_coop.data.promo_mechanics;
      this.selected_coop.data.max_Promos = this.selected_coop.data.max_Promos;
      this.selected_coop.data.no_promos.lower_bound = offer.no_of_offers[0];
      this.selected_coop.data.no_promos.upper_bound = offer.no_of_offers[1];
      this.offers_list[this.child_ohmID].child_node[0] = this.selected_coop;
    }
  }

  actcall: boolean = false;
  getFixedPromo(content: any) {
    this.startDate = this.selected_coop.data.start_date;
    this.duration = this.selected_coop.data.duration_max;
    let ngbModalOptions: NgbModalOptions = {
      ariaLabelledBy: constant.preview_page.modalBasic,
      backdrop: 'static',
      keyboard: false
    };
    this.actcall = true;
    this.offerConfiguration.fixed_promo_called = this.actcall;
    if (this.fixed_Promo) {
      if (this.fixed_Promo.length != 0) {
        this.modalService.open(content, ngbModalOptions).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
      else if (this.fixed_Promo.length == 0) {
        this.getPromos_fixed();
      }
    }
    else {
      this.getPromos_fixed();
    }
  }
  getPromos_fixed() {
    this.offerRecommenderService.getFixedPromoList(this.ohm_ids[0], this.ohm_ids[1], this.startDate, this.duration).subscribe((response: any) => {
      this.fixed_Promo = response.data.fixed_promos;
      this.selected_coop.data.fixed_promos = this.fixed_Promo;
      this.lastUpdated = response.data.last_update;
      this.updateOfferConfiguration();
    }, (error) => {
      this.toastr.error(error.error.data);
    });
    this.modalService.dismissAll();
  }
  ohm_ids: any;
  count = 0;
  showOptions(event: any, subseg: any, seg: any, i: any) {
    if (seg.coop_name == 'National')
      this.ohm_ids = [seg.child_nodes[0].ohm_id, ''];
    else
      this.ohm_ids = [seg.child_nodes[0].ohm_id, seg.child_nodes[1].ohm_id];
    if (event.checked == true) {
      this.count += 1;
      this.check = true;
      this.getCoopDetails(seg.coop_name, subseg.coop_name, seg.ohm_id, subseg.ohm_id);
      this.get_white_line(i, subseg);
    }
    if (event.checked == false) {
      this.count -= 1;
      delete this.offers_list[subseg.ohm_id];
      if (this.seg_name == subseg['coop_name']) {
        if (Object.keys(this.offers_list).length > 0) {
          for (let key in this.offers_list) {
            for (let i = 0; i < this.segmentList.length; i++) {
              if (this.segmentList[i].child_nodes[0].ohm_id == key) {
                this.getCoopDetails(this.segmentList[i].coop_name, this.segmentList[i].child_nodes[0].coop_name, this.segmentList[i].ohm_id, this.segmentList[i].child_nodes[0].ohm_id);
                this.get_white_line(i, this.segmentList[i].child_nodes[0]);
                this.check = true;
                break;
              }
              else if (this.segmentList[i].child_nodes[1].ohm_id == key) {
                this.getCoopDetails(this.segmentList[i].coop_name, this.segmentList[i].child_nodes[1].coop_name, this.segmentList[i].ohm_id, this.segmentList[i].child_nodes[1].ohm_id);
                this.get_white_line(i, this.segmentList[i].child_nodes[1]);
                this.check = true;
                break;
              }
            }
            if (this.check == true) {
              break;
            }
          }
        }
        else {
          this.disp = false;
        }
      }
      if (subseg['coop_name'] == "Deal") {
        for (let i = 0; i < this.applySegementListDeal.length; i++) {
          if (this.applySegementListDeal[i].child_ohmID == subseg.ohm_id) {
            this.applySegementListDeal.splice(i, 1);
          }
        }
      }
      else {
        for (let i = 0; i < this.applySegementListValue.length; i++) {
          if (this.applySegementListValue[i].child_ohmID == subseg.ohm_id) {
            this.applySegementListValue.splice(i, 1);
          }
        }
      }
    }
    if (this.count == 0) {
      this.disp = false;
    }
  }

  getCoopDetails(coopName: any, subSegment_coop_name: any, parentOhm_id: any, childOhm_id: any) {
    this.disp = true;
    this.coopName = coopName;
    this.subSegment_coop_name = subSegment_coop_name;
    this.child_ohmID = childOhm_id;
    this.parent_ohm_id = parentOhm_id;

    if (!(childOhm_id in this.offers_list)) {
      this.offerRecommenderService.fetchCoopDetails(childOhm_id).subscribe((response: any) => {
        this.offers_list[childOhm_id] = response.data;
        this.getIndexBasedOnSegment(parentOhm_id, childOhm_id);
        this.startdatee.value = '';
        this.selected_coop.data.start_date = this.startdatee.value;
        this.selected_coop.data.duration_min = response.data.child_node[0].data.duration_min;
        this.selected_coop.data.duration_max = response.data.child_node[0].data.duration_max;
        this.setDurationMaxValue(1, 10, this.selected_coop.data.duration_min, this.selected_coop.data.duration_max);
        this.productListItems = response.data.child_node[0].data.product_categories.map((item: any) => { return { category_id: item, category: item } });
        this.promoMechChannelListItems = response.data.child_node[0].data.promo_mechanics.map((item: any) => { return { promomech_id: item.dis_mech_code, promomech_name: item.dis_mech_desc } });
        this.selected_coop.data.product_categories_data = this.productListItems;
        this.selected_coop.data.promo_mech_data = this.promoMechChannelListItems;
        this.durMinValue = this.selected_coop.data.duration_min;
        this.durMaxValue = this.selected_coop.data.duration_max;
        this.min_depth_1 = response.data.child_node[0].data.promo_depth_1.lower_bound * 100;
        this.max_depth_1 = response.data.child_node[0].data.promo_depth_1.upper_bound * 100;
        this.min_depth_2 = response.data.child_node[0].data.promo_depth_2.lower_bound * 100;
        this.max_depth_2 = response.data.child_node[0].data.promo_depth_2.upper_bound * 100;
        this.setDiscountMaxValue1(10, 100, response.data.child_node[0].data.promo_depth_1.lower_bound * 100, response.data.child_node[0].data.promo_depth_1.upper_bound * 100);
        this.setDiscountMaxValue2(10, 100, response.data.child_node[0].data.promo_depth_2.lower_bound * 100, response.data.child_node[0].data.promo_depth_2.upper_bound * 100);
        this.noofpromos_min = response.data.child_node[0].data.no_promos.lower_bound;
        this.noofpromos_max = response.data.child_node[0].data.no_promos.upper_bound;
        this.setNoOffers(1, 10, response.data.child_node[0].data.no_promos.lower_bound, response.data.child_node[0].data.no_promos.upper_bound);
        // this.resetOfferConfig();
        this.subSegment_coop_name == "Deal" ? this.applySegementListDeal.push({
          "coopName": coopName + " " + subSegment_coop_name,
          "child_ohmID": childOhm_id
        }) : this.applySegementListValue.push({
          "coopName": coopName + " " + subSegment_coop_name,
          "child_ohmID": childOhm_id
        });
        this.fixed_Promo = [];
        this.resetDayPart().clear();
        this.addDatPart();
        this.updateOfferConfiguration();
        this.actcall = false;
      }, (error) => {
        this.toastr.error(error.error.data);
      });
    }
    else {
      this.getIndexBasedOnSegment(parentOhm_id, childOhm_id);
      setTimeout(() => {
        this.startdatee.value = this.selected_coop?.data?.start_date;
        this.setDurationMaxValue(1, 10, this.selected_coop.data.duration_min, this.selected_coop.data.duration_max);
      }, 100);
      this.fixed_Promo = this.selected_coop.data.fixed_promos;
      this.selectedItemList = this.selected_coop.data.selectedItemList;
      this.selectedProductList = this.selected_coop.data.selectedProductList;
      this.productListItems = this.selected_coop.data.product_categories_data;
      this.promoMechChannelListItems = this.selected_coop.data.promo_mech_data;
      this.selectedPromoList = this.selected_coop.data.selectedPromoList;
      this.setDiscountMaxValue1(this.configList.discount_depth_min, this.configList.discount_depth_max, this.selected_coop.data.promo_depth_1.lower_bound * 100, this.selected_coop.data.promo_depth_1.upper_bound * 100);
      this.setDiscountMaxValue2(this.configList.discount_depth_min, this.configList.discount_depth_max, this.selected_coop.data.promo_depth_2.lower_bound * 100, this.selected_coop.data.promo_depth_2.upper_bound * 100);
      this.setNoOffers(1, 10, this.selected_coop.data.no_promos.lower_bound, this.selected_coop.data.no_promos.upper_bound);
    }
  }

  getCompitionList() {
    this.offerRecommenderService.fetchCompitionList().subscribe((response: any) => {
      let brandList = [];
      let discountList = [];
      let index = 1;
      for (let brand in response.data) {
        brandList.push({ competition_brand_id: index, competition_brand_name: brand });
        let x = String(brand);
        discountList.push({ competition_offer_brand: brand, brand_discounts: response.data[brand] });
        index++;
      }
      this.brandList = brandList;
      this.discountList = discountList;
    }, (error) => {
      this.toastr.error(error.error.data);
    });
  }

  selected_coop: any;
  /** Segment init patch works  */
  getIndexBasedOnSegment(parentOhm_id: any, childOhm_id: any) {
    let selectedCoop = this.getSelectedCoop(parentOhm_id, childOhm_id);
    this.selected_coop = selectedCoop;
    if (Object.keys(selectedCoop).length > 0) {
      this.applyToFunction();
      this.patchObjectivetValues(selectedCoop);
      this.patchPromoValues(selectedCoop);
      this.patchProductValues(selectedCoop);
      setTimeout(() => {
        this.editLowerBoundList();
        this.enableDropDown(false);
      }, 200);
    }
  }
  getSelectedCoop(parentOhm_id: any, childOhm_id: any) {
    let filteredCoop: any = [];
    filteredCoop = this.offers_list[childOhm_id].child_node.filter((item: any) => item.ohm_id == childOhm_id)[0];
    return filteredCoop;
  }

  subsegment_highlight: any = {};
  seg_name: any;
  get_white_line(index: any, subseg: any) {
    for (let i = 0; i < this.segmentList.length; i++) {
      this.subsegment_highlight[i] = false;
    }
    this.subsegment_highlight[index] = true;
    this.seg_name = subseg['coop_name'];
  }

  /** Segment init patch works  */                  //need to check and remove
  getIndexBasedOnSegmentId(index: any) {
    if (this.validateSelSegment(index)) {
      this.editableSegmentIndex = index;
      this.applyToFunction();
      this.getFinalSelSegmentIndex();
      this.patchObjectiveDefaultValues();
      this.patchProductDefaultValues();
      this.patchOfferDefaultVaules();
      setTimeout(() => {

        this.editLowerBoundList();
        this.enableDropDown(false);

      }, 200);
    }
  }

  applyToFunction() {
    this.applyConfiguration = undefined;
    this.applySegementList = [];
    this.selectedApplyConfiguration = [];
    setTimeout(() => {
      this.subSegment_coop_name == "Deal" ? this.applySegementList = [...this.applySegementListDeal] : this.applySegementList = [...this.applySegementListValue];
      let itemToFind = this.child_ohmID;
      let foundIdx = this.applySegementList.findIndex((el: any) => el.child_ohmID == itemToFind);
      this.applySegementList.splice(foundIdx, 1);
    }, 500);
  }

  /** Get final segment Index number */  //need to check and remove
  getFinalSelSegmentIndex() {
    for (let i = 0; i < this.offerConfiguration.segment.length; i++) {
      if (this.segmentList[this.editableSegmentIndex].segment_id == this.offerConfiguration.segment[i].segment_id) {
        this.finalSelSegmentIndex = i;
        break;
      }
    }
  }

  /** patch objective value in form */
  patchObjectivetValues(selectedCoop: any) {
    this.maximizeList = selectedCoop.data.objective.map((item: any) => {
      return {
        objective_id: item.id,
        objective_name: item.desc,
        promo_id: item.code,
        promo_objective_id: item.is_default
      }
    });
    this.resetLowerBond().clear();
    let objectiveDefaultList: any = {};
    objectiveDefaultList = this.getDefaultValue(constant.OFFER_CONFIGURATION.OBJECTIVE);

    this.resetLowerBond().clear();
    for (let i = 0; i < objectiveDefaultList.lower_bound.length; i++) {
      this.addLowerBond();
    }
    setTimeout(() => {
      this.offerConfigurationForm.patchValue({
        objective: {
          maximize: this.getMaximizeList(objectiveDefaultList.maximize.objective_id),
          lower_bound: objectiveDefaultList.lower_bound
        }
      });
      this.offers_list[this.child_ohmID].child_node[0].data.objective_list.maximize = this.getMaximizeList(objectiveDefaultList.maximize.objective_id);
    }, 100);
  }
  /** patch objective value in form */
  patchObjectiveDefaultValues() {

    let objectiveDefaultList: any = {};
    objectiveDefaultList = this.getDefaultValue(constant.OFFER_CONFIGURATION.OBJECTIVE);

    this.resetLowerBond().clear();
    for (let i = 0; i < objectiveDefaultList.lower_bound.length; i++) {
      this.addLowerBond();
    }
    this.offerConfigurationForm.patchValue({
      objective: {
        maximize: this.getMaximizeList(objectiveDefaultList.maximize.objective_id),
        lower_bound: objectiveDefaultList.lower_bound
      }
    })

  }
  /** patch product value in form */
  patchProductValues(selectedCoop: any) {
    this.dayPartList = selectedCoop.data.daypart.map((item: any) => { return { dayPart_id: item, dayPart_name: item } });
    this.productList = selectedCoop.data.product_categories.map((item: any) => { return { category_id: item, category: item } });
    this.getProductBaseditem(selectedCoop);
    this.restructureItemList();
    let productDefaultList: any = {};
    productDefaultList = this.getDefaultValue(constant.OFFER_CONFIGURATION.PRODUCT);

    this.resetMaxOffer().clear();
    for (let i = 0; i < productDefaultList.max_offers.length; i++) {
      this.addMaxOffer();
    }

    this.offerConfigurationForm.patchValue({
      product: this.getDefaultValue(constant.OFFER_CONFIGURATION.PRODUCT)
    })
    this.getItemBasedSelProduct();
  }
  /** Get item based on sel products */
  getProductBaseditem(selectedCoop: any) {
    this.itemList = [];
    if (this.offerConfigurationForm.getRawValue().product.product_item != null) {
      if (this.offerConfigurationForm.getRawValue().product.product_item.length == 0) {
        this.productList.map((item: any) => {
          if (item.category in selectedCoop.data.item) {
            selectedCoop.data.item[item.category].map((nestedItem: any) => {
              this.itemList.push({
                item_id: nestedItem.item_id,
                item_code: nestedItem.item_desc,
                item_name: nestedItem.item_desc,
                category_name: item.category,
                is_active: nestedItem.isactive,
              });
            });
          }
        });
      }
      else {
        this.offerConfigurationForm.getRawValue().product.product_item.map((item: any) => {
          if (item.category in selectedCoop.data.item) {
            selectedCoop.data.item[item.category].map((nestedItem: any) => {
              this.itemList.push({
                item_id: nestedItem.item_id,
                item_code: nestedItem.item_desc,
                item_name: nestedItem.item_desc,
                category_name: item.category,
                is_active: nestedItem.isactive,
              });
            });
          }
        });
      }
    }
    else {
      this.productList.map((item: any) => {
        selectedCoop.data.item[item.category].map((nestedItem: any) => {
          this.itemList.push({
            item_id: nestedItem.item_id,
            item_code: nestedItem.item_desc,
            item_name: nestedItem.item_desc,
            category_name: item.category,
            is_active: nestedItem.isactive,
          });
        });
      });
    }
    return this.itemList;
  }
  /** patch product value in form */
  patchProductDefaultValues() {
    let productDefaultList: any = {};
    productDefaultList = this.getDefaultValue(constant.OFFER_CONFIGURATION.PRODUCT);

    this.resetMaxOffer().clear();
    for (let i = 0; i < productDefaultList.max_offers.length; i++) {
      this.addMaxOffer();
    }

    this.offerConfigurationForm.patchValue({
      product: this.getDefaultValue(constant.OFFER_CONFIGURATION.PRODUCT)
    })

    this.getItemBasedSelProduct();
  }
  patchPromoValues(selectedCoop: any) {
    this.promoMechChannelList = selectedCoop.data.promo_mechanics.map((item: any) => { return { promomech_id: item.dis_mech_code, promomech_name: item.dis_mech_desc } });
    this.resetDayPart().clear();
    for (let i = 0; i < this.offers_list[this.child_ohmID]?.child_node[0]?.data?.promo_list?.daypart?.length; i++) {
      this.addDatPart();
    }
    this.offerConfigurationForm.patchValue({
      offer: {
        promo_mechanic: this.promoMechChannelList,
        discount_depth: [this.selected_coop.data.promo_depth_1.lower_bound * 100, this.selected_coop.data.promo_depth_1.upper_bound * 100],
        discount_depth_two: [this.selected_coop.data.promo_depth_2.lower_bound * 100, this.selected_coop.data.promo_depth_2.upper_bound * 100],
        no_of_offers: [this.selected_coop.data.no_promos.lower_bound, this.selected_coop.data.no_promos.upper_bound]
      }
    });
  }


  /** patch offer value in form */
  patchOfferDefaultVaules() {
    this.offerConfigurationForm.patchValue({
      offer: this.getDefaultValue(constant.OFFER_CONFIGURATION.MAX_OFFERS)
    })
  }

  /** lower bond validation */

  lowerBoundList: any = [];
  editLowerBoundList() {
    this.lowerBoundList = []
    let removeObjectiveId: any = [];
    removeObjectiveId.push(this.offerConfigurationForm.getRawValue().objective.maximize.objective_name);

    for (let i = 0; i < this.maximizeList.length; i++) {
      if (removeObjectiveId.indexOf(this.maximizeList[i].objective_name) == -1) {
        this.lowerBoundList.push(this.maximizeList[i]);
      }
    }
  }

  enableDropDown(disable: boolean) {
    this.promoMechanicdropdownSettings = {
      "primaryKey": "promomech_id",
      "labelKey": "promomech_name",
      "text": "Select Promo Mechanics",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "classes": "myclass custom-class",
      "enableSearchFilter": true,
      "badgeShowLimit": 1,
      "position": "bottom",
      "disabled": disable
    }

    this.productDropdownSettings = {
      "primaryKey": "category_id",
      "labelKey": "category",
      "text": "Select Category",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "classes": "myclass custom-class",
      "enableSearchFilter": true,
      "badgeShowLimit": 1,
      "position": "bottom",
      "disabled": disable
    }


    this.itemdropdownSettings = {
      "primaryKey": "item_id",
      "labelKey": "item_name",
      "text": "Select Items",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "classes": "myclass custom-class",
      "enableSearchFilter": true,
      "badgeShowLimit": 1,
      "position": "bottom",
      "disabled": disable
    }
    this.dayPartSetting = {
      "primaryKey": "dayPart_id",
      "labelKey": "dayPart_name",
      "text": "Select Items",
      "selectAllText": "Select All",
      "unSelectAllText": "UnSelect All",
      "classes": "myclass custom-class",
      "enableSearchFilter": true,
      "badgeShowLimit": 1,
      "position": "bottom",
      "disabled": disable
    }


  }

  /** validate user selected right segment */
  validateSelSegment(index: number) {
    let validateSelSegement = false;
    let selSegmentList: any = [];
    for (let i = 0; i < this.selSegment.length; i++) {
      selSegmentList.push(this.selSegment[i].segment_id);
    }

    for (let i = 0; i < this.segmentList.length; i++) {
      if (selSegmentList.indexOf(this.segmentList[index].segment_id) != -1) {
        validateSelSegement = true;
      }
    }
    return validateSelSegement;
  }

  /** Get Item List based on selected product */
  onProductSelect(item: any) {
    this.getItemBasedSelProduct();
    this.updateOfferConfiguration()
  }

  /** Get Item List based on selected product */
  onProductSelectAll(event: any) {
    this.getItemBasedSelProduct();
    this.updateOfferConfiguration()
  }

  /** Get Item List based on selected product */
  onProductDeSelect(event: any, content: any) {
    this.resetProductAndItemList(event, content);
    this.getProductBaseditem(this.selected_coop);
    this.offerConfigurationForm.patchValue({
      product: {
        item: this.itemList
      }
    });
  }

  /** Reset Product And Item List */
  resetProductAndItemList(event: any, content: any) {
    if (this.checkExistInProductItem(event)) {
      this.triggerMaxOfferWarningModel(content);
    } else {
      this.updateOfferConfiguration();
    }
  }

  /** check Product Item Exist */
  rmProductItemIndex: number = -1;
  checkExistInProductItem(event: any) {
    this.rmProductItemIndex = -1;
    let isValidProductItem: boolean = false;
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().product.max_offers.length; i++) {
      if (this.offerConfigurationForm.getRawValue().product.max_offers[i].product_item == event.category_id) {
        this.rmProductItemIndex = i;
        isValidProductItem = true;
      }
    }

    if (!isValidProductItem) {

      let category_id: any = [];
      for (let i = 0; i < this.offerConfigurationForm.getRawValue().product.item.length; i++) {
        category_id.push(this.offerConfigurationForm.getRawValue().product.item[i].category_id)
      }


      if (!(category_id.indexOf(event.category_id) == -1)) {
        isValidProductItem = true;
      }

    }

    return isValidProductItem;
  }

  /** Trigger Max Offer Model */
  triggerMaxOfferWarningModel(content: any) {
    let ngbModalOptions: NgbModalOptions = {
      ariaLabelledBy: constant.preview_page.modalBasic,
      backdrop: 'static',
      keyboard: false
    };
    this.modalService.open(content, ngbModalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** Patch Previous Max Value */
  patchPreviousMaxValue() {
    this.patchProductDefaultValues();
    this.modalService.dismissAll();
    this.updateOfferConfiguration()
  }

  /** Patch Previous Fixed Promos */
  patchPreviousFixedPromos() {
    this.fixed_Promo = [...this.fixed_Promo];
    this.modalService.dismissAll();
    this.updateOfferConfiguration()
  }

  /** Remove Item And Product By Index */
  removeItemAndProductByIndex() {
    if (this.rmProductItemIndex >= 0) {
      this.removeUnSelItemList();
      this.modalService.dismissAll();
      this.removeMaxOffer(this.rmProductItemIndex);
    } else {
      this.removeUnSelItemList();
      this.modalService.dismissAll();
    }
    this.updateOfferConfiguration();
  }

  /** Remove UnSelected Item List */
  removeUnSelItemList() {
    let selItemList: any = [];

    let category_id: any = [];
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().product.product_item.length; i++) {
      category_id.push(this.offerConfigurationForm.getRawValue().product.product_item[i].category_id)
    }

    for (let i = 0; i < this.offerConfigurationForm.getRawValue().product.item.length; i++) {
      if (!(category_id.indexOf(this.offerConfigurationForm.getRawValue().product.item[i].category_id) == -1)) {
        selItemList.push(this.offerConfigurationForm.getRawValue().product.item[i]);
      }
    }

    this.offerConfigurationForm.patchValue(
      {
        product: {
          item: selItemList,
        }
      }
    )

    this.getItemBasedSelProduct();
  }

  /** Remove All item and product */
  removeAllItemAndProduct() {
    this.resetProduct();
    this.modalService.dismissAll();
  }


  /** Get Item List based on selected product */
  onProductDeSelectAll(event: any, content: any) {
    if (this.offerConfigurationForm.getRawValue().product.product_item.length > 0
      || this.offerConfigurationForm.getRawValue().product.item.length > 0) {
      this.triggerMaxOfferWarningModel(content);
    } else {
      this.updateOfferConfiguration();
    }
  }

  /** Reset Product */
  resetProduct() {
    this.resetMaxOffer().clear();
    setTimeout(() => {
      this.offerConfigurationForm.patchValue({ product: { item: [], } })
      this.addMaxOffer();
      this.getItemBasedSelProduct();
      this.updateOfferConfiguration();

    }, 200);
  }

  /** restructure form based on the selected items */
  onItemSelect(event: any) {
    this.updateOfferConfiguration();
  }

  /** reset form and get the update segment based on the selected promo channel */
  selPromoChannel(event: any) {
    if (this.promoChannelList[0].coop_name == 'National') {
      let data = this.promoChannelList;
      let Nat_ohm_id = this.promoChannelList[0].ohm_id;
      if (event.ohm_id == Nat_ohm_id) {
        this.promoChannelList = data.map((item: { ohm_id: any; disabled: boolean; }) => {
          if (item.ohm_id == Nat_ohm_id) {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
          return item;
        });
      }
      else {
        this.promoChannelList = data.map((item: { ohm_id: any; disabled: boolean; }) => {
          if (item.ohm_id == Nat_ohm_id) {
            item.disabled = true;
          } else {
            item.disabled = false;
          }
          return item;
        });
      }
    }
    this.geolistappend.push(event.ohm_id);
    this.offerConfigurationInterface();
  }

  geolistappend: any = [];
  nat_geo: any = [];
  allselectPromoChannel(event: any) {
    if (this.promoChannelList[0].coop_name == 'National') {
      this.nat_geo = this.promoChannelList.splice(0, 1);
    }
    this.selectedGeoList = event;
    let itemToFind = 'National';
    let foundIdx = this.selectedGeoList.findIndex((el: any) => el.coop_name == itemToFind);
    if (foundIdx == 0)
      this.selectedGeoList.splice(foundIdx, 1);
    this.geolistappend = [];
    for (var i = 0; i < this.selectedGeoList.length; i++) {
      this.geolistappend.push(this.selectedGeoList[i].ohm_id);
    }
    this.offerConfigurationInterface();
  }

  unSelPromoChannel(event: any) {
    var ohm_id = event.ohm_id;
    const index = this.geolistappend.indexOf(ohm_id);
    this.geolistappend.splice(index, constant.preview_page.one);
    if (this.geolistappend.length == 0) {
      if (this.nat_geo.length == 1 && this.promoChannelList[0].coop_name != 'National')
        this.promoChannelList.unshift(this.nat_geo[0]);
      this.promoChannelList = this.promoChannelList.map((item: any) => {
        item.disabled = false;
        return item;
      });
    }
    this.offerConfigurationInterface();
    this.applyToFunction()
  }

  unSelPromoChannelAll(event: any) {
    this.geolistappend = [];
    if (this.nat_geo.length == 1)
      this.promoChannelList.unshift(this.nat_geo[0]);
    this.promoChannelList = this.promoChannelList.map((item: any) => {
      item.disabled = false;
      return item;
    });
  }

  /** reset offerconfiguration form */
  resetOfferConfig() {
    this.offerConfigurationForm.controls[constant.OFFER_CONFIGURATION.OBJECTIVE_FORM_NAME].reset();
    this.offerConfigurationForm.controls[constant.OFFER_CONFIGURATION.PRODUCT_FORM_NAME].reset();
    this.offerConfigurationForm.controls[constant.OFFER_CONFIGURATION.OFFER_FORM_NAME].reset();

    this.resetMaxOffer().clear();
    this.addMaxOffer();

    this.resetLowerBond().clear();
    this.addLowerBond();

    this.editableSegmentIndex = undefined;
    this.finalSelSegmentIndex = undefined;
  }

  /** Value Change on Duration */
  valueChangeOnDuration(event: any): void {
    this.selected_coop.data.duration_min = this.offerConfigurationForm.getRawValue().period.period_duration[0];
    this.selected_coop.data.duration_max = this.offerConfigurationForm.getRawValue().period.period_duration[1];
    this.updateOfferConfiguration();
  }
  /** Value Change on Discount Depth 1 */
  valueChangeOnDepth1(event: any): void {
    this.selected_coop.data.promo_depth_1.lower_bound = this.offerConfigurationForm.getRawValue().offer.discount_depth[0] / 100;
    this.selected_coop.data.promo_depth_1.upper_bound = this.offerConfigurationForm.getRawValue().offer.discount_depth[1] / 100;
    this.updateOfferConfiguration();
  }
  /** Value Change on Discount Depth 2 */
  valueChangeOnDepth2(event: any): void {
    this.selected_coop.data.promo_depth_2.lower_bound = this.offerConfigurationForm.getRawValue().offer.discount_depth_two[0] / 100;
    this.selected_coop.data.promo_depth_2.upper_bound = this.offerConfigurationForm.getRawValue().offer.discount_depth_two[1] / 100;
    this.updateOfferConfiguration();
  }
  /** Value Change on No of Offers */
  valueChangeOnNoOfOffers(event: any): void {
    this.selected_coop.data.no_promos.lower_bound = this.offerConfigurationForm.getRawValue().offer.no_of_offers[0];
    this.selected_coop.data.no_promos.upper_bound = this.offerConfigurationForm.getRawValue().offer.no_of_offers[1];
    this.updateOfferConfiguration();
  }


  backtoSummary() {
    this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
  }

  cancelGo() {
    this.modalService.dismissAll()
    this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
  }

  /** get Maximize list by maximize id */
  getMaximizeList(objective_id: number) {
    let maxObj: any = {};
    for (let i = 0; i < this.maximizeList.length; i++) {
      if (this.maximizeList[i].objective_id == objective_id) {
        maxObj = this.maximizeList[i];
        break;
      }
    }
    return maxObj;
  }

  /** reset lower Bond */
  resetLowerBond() {
    return this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.OBJECTIVE_FORM_NAME).get(constant.OFFER_CONFIGURATION.LOWER_BOUND_FORM_NAME) as FormArray;
  }

  /** reset Day Part*/
  resetDayPart() {
    return this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.OFFER_FORM_NAME).get(constant.OFFER_CONFIGURATION.DAY_PART_FORM_NAME) as FormArray;
  }

  /** Get item based on sel products */
  getItemBasedSelProduct() {
    this.itemList = [];
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().product.product_item.length; i++) {
      let itemCategory: any = [];
      itemCategory = this.restructureItem.get(this.offerConfigurationForm.getRawValue().product.product_item[i].category);
      if (!this.utils.isNullOrEmptyOrUndefined(itemCategory)) {
        for (let i = 0; i < itemCategory.length; i++) {
          this.itemList.push(itemCategory[i])
        }
      }
    }
    this.offerConfigurationForm.patchValue({
      product: {
        item: this.itemList
      }
    });
  }

  /** Get item based on sel products */
  getAllItemBasedAllProduct() {
    this.itemList = [];
    for (let i = 0; i < this.productList.length; i++) {
      let itemCategory: any = [];
      itemCategory = this.restructureItem.get(this.productList[i].category);
      if (!this.utils.isNullOrEmptyOrUndefined(itemCategory)) {
        for (let i = 0; i < itemCategory.length; i++) {
          this.itemList.push(itemCategory[i])
        }
      }
    }
  }

  /** Restructure Item List */
  restructureItemList() {
    let itemCopy: any = Object.assign(this.itemList);
    var itemListGroups = new Set(itemCopy.map((item: { category_name: any; }) => item.category_name))

    itemListGroups.forEach(g =>
      this.restructureItem.set(g, itemCopy.filter((i: { category_name: any; }) => i.category_name === g))
    )
  }

  /**reset max offer in form */
  resetMaxOffer() {
    return this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.PRODUCT_FORM_NAME).get(constant.OFFER_CONFIGURATION.MAX_OFFERS_FORM_NAME) as FormArray;
  }

  /** patch from value and based structure */
  getDefaultValue(value: any) {
    switch (value) {
      case constant.OFFER_CONFIGURATION.OBJECTIVE:
        let maximizeDefaultList: any = {};
        if (this.validateObjectHasKey('objective_list', this.child_ohmID)) {
          maximizeDefaultList = this.offers_list[this.child_ohmID].child_node[0].data.objective_list;
          if (this.offers_list[this.child_ohmID].child_node[0].data.objective_list.lower_bound.length == 0) {
            maximizeDefaultList.lower_bound = this.dynamicFormService.addDefaultLowerBond();
          }
        } else {
          for (let i = 0; i < this.maximizeList.length; i++) {
            if (constant.OFFER_CONFIGURATION.PATCH_DEFAULT_OBJECTIVE == this.maximizeList[i].promo_objective_id) {
              maximizeDefaultList.maximize = Object.assign({}, this.maximizeList[i]);
              break;
            }
          }
          maximizeDefaultList.lower_bound = this.dynamicFormService.addDefaultLowerBond();
        }
        return maximizeDefaultList;

      case constant.OFFER_CONFIGURATION.PRODUCT:
        let productDefaultList: any = {};
        if (this.validateObjectHasKey('prod', this.child_ohmID)) {
          productDefaultList = this.offers_list[this.child_ohmID].child_node[0].data.prod;
        } else {
          productDefaultList.product_item = Object.assign([], this.productList);
          this.getAllItemBasedAllProduct();
          productDefaultList.item = Object.assign([], this.itemList);
          productDefaultList.max_offers = this.dynamicFormService.addDefaultMaxOffers();
        }
        return productDefaultList;

      case constant.OFFER_CONFIGURATION.MAX_OFFERS:
        let maxOffers: any = {};
        if (this.validateObjectHasKey('promo_list', this.child_ohmID)) {
          maxOffers = this.offers_list[this.child_ohmID].child_node[0].data.promo_list;
        } else {
          maxOffers.promo_mechanic = Object.assign([], this.promoMechChannelList);
          maxOffers.no_of_offers = [this.configList.no_of_offer_range_min, this.configList.no_of_offer_range_max];
          maxOffers.discount_depth = [this.configList.discount_depth_range_min, this.configList.discount_depth_range_max];
          maxOffers.discount_depth_two = [this.configList.discount_depth_range_min, this.configList.discount_depth_range_max];
          maxOffers.daypart = this.dynamicFormService.addDefaultDayPart();
        }

        return maxOffers;

      case constant.OFFER_CONFIGURATION.COMPETITION_DISCOUNTS:
        let compDiscounts: any = {};
        if (Object.keys(this.offerConfiguration).length > 0) {
          compDiscounts = this.offerConfiguration.competition_discounts;
          if (compDiscounts.length == 0) {
            compDiscounts = this.dynamicFormService.addCompetitionDiscounts();
          }
        } else {
          compDiscounts = this.dynamicFormService.addCompetitionDiscounts();
        }

        return compDiscounts;

      default:
        return;
    }
  }

  /** validate structure has proper key value */
  validateObjectHasKey(value: any, index: number) {
    return Object.keys(this.offers_list).length > 0
      && this.offers_list[index].child_node[0].data.hasOwnProperty(value);
  }

  /** update form based on the selected promo mechanics */
  onPromoMechanicSelect(event: any) {
    this.updateOfferConfiguration();
  }

  pad2(n: any) { return n < 10 ? '0' + n : n }

  /** preview offer configuration details*/
  previewSubmit(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic, size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    let default_values: any = [];
    default_values = [this.durMinValue, this.durMaxValue, this.min_depth_1, this.max_depth_1, this.min_depth_2, this.max_depth_2, this.noofpromos_min, this.noofpromos_max];
    sessionStorage.setItem(constant.preview_page.getPreview, JSON.stringify(this.preview_config));
    sessionStorage.setItem(constant.preview_page.getSelectedGeoList, JSON.stringify([this.geolistappend, this.child_ids, default_values]));
    this.offerRecommenderService.sendOfferListdata(this.offers_list);
    this.offerRecommenderService.sendOfferConfigdata(this.offer_config_dictionary);
  }

  valid: boolean = false;
  child_ids: any = [];
  /**Validate Data for preview */
  validateFormData(cont: any, content: any, content2: any) {
    this.preview_config = [];
    this.userInfo = JSON.parse(sessionStorage.getItem('loginResponse') || '{}');
    if (Object.keys(this.userInfo).length !== 0) {
      this.userName = this.userInfo.user_info.first_name + ' ' + this.userInfo.user_info.last_name;
    }
    let date = new Date();
    let time_stmp = date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) + '-' + this.pad2(date.getDate()) + ' ' + this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes());
    if (this.offerConfiguration.offer_package_name == '') {
      this.offerConfiguration.offer_package_name = 'PP' + '_' + this.userName + '_' + time_stmp;
    }
    else {
      this.offerConfiguration.offer_package_name += '_' + this.userName + '_' + time_stmp;
    }
    this.child_ids = [];
    for (let key in this.offer_config_dictionary) {
      this.child_ids.push(key);
      this.offer_config_dictionary[key].offer_package_name = this.offerConfiguration.offer_package_name;
      if (!this.offer_config_dictionary[key].hasOwnProperty('fixed_promos') || this.offer_config_dictionary[key].fixed_promos == undefined)
        this.offer_config_dictionary[key].fixed_promos = [];
      if (key != undefined) {
        this.preview_config.push(this.offer_config_dictionary[key]);
      }
    }
    if (this.coopName != 'National')
      this.preview_config.pop();
    else if (this.coopName == 'National' && this.preview_config.length > 1)
      this.preview_config.pop();
    let flag = 0;
    let flag2 = 0;
    this.preview_config.forEach(function (preview: any) {
      if (preview.start_date == '')
        flag = 1;
      if (preview.objective.lower_bound.length >= 1) {
        for (let i = preview.objective.lower_bound.length - 1; i >= 0; i--) {
          if (preview.objective.lower_bound[i].lower_bound_name == '' || preview.objective.lower_bound[i].lower_bound_name == null) {
            preview.objective.lower_bound.splice(i, 1);
            preview.object_lower_bound.splice(i, 1);
          }
        }
        if (!preview.objective.lower_bound) {
          preview.objective.lower_bound = [];
          preview.object_lower_bound = [];
        }
      }
      if (preview.product.max_offers.length >= 1) {
        for (let i = preview.product.max_offers.length - 1; i >= 0; i--) {
          if (preview.product.max_offers[i].product_item == '' || preview.product.max_offers[i].product_item == null) {
            preview.product.max_offers.splice(i, 1);
            preview.maximum_product_categories.splice(i, 1);
          }
        }
        if (!preview.product.max_offers) {
          preview.product.max_offers = [];
          preview.maximum_product_categories = [];
        }
      }
      if (preview.offer.daypart.length >= 1) {
        for (let i = preview.offer.daypart.length - 1; i >= 0; i--) {
          if (preview.offer.daypart[i].dayPart_item == '' || preview.offer.daypart[i].dayPart_item == null) {
            preview.offer.daypart.splice(i, 1);
            preview.maximum_day_part.splice(i, 1);
          }
        }
        if (!preview.offer.daypart) {
          preview.offer.daypart = [];
          preview.maximum_day_part = [];
        }
      }
      if (preview.product.product_item.length == 0)
        flag = 1;
      if (preview.product.item.length == 0)
        flag = 1;
      if (preview.offer.promo_mechanic.length == 0)
        flag = 1;
      if (preview.fixed_promo_called == false)
        flag = 1;

      if (preview.objective.lower_bound.length >= 1) {
        for (let i = preview.objective.lower_bound.length - 1; i >= 0; i--) {
          if (preview.objective.lower_bound[i].lower_bound_percentage != 0) {
            if (preview.objective.lower_bound[i].lower_bound_percentage == '' || preview.objective.lower_bound[i].lower_bound_percentage == null) {
              flag2 = 1;
            }
          }
        }
      }
      if (preview.product.max_offers.length >= 1) {
        for (let i = preview.product.max_offers.length - 1; i >= 0; i--) {
          if (preview.product.max_offers[i].max_offer == '' || preview.product.max_offers[i].max_offer == null) {
            flag2 = 1;
          }
        }
      }
      if (preview.offer.daypart.length >= 1) {
        for (let i = preview.offer.daypart.length - 1; i >= 0; i--) {
          if (preview.offer.daypart[i].dayPart_offer == '' || preview.offer.daypart[i].dayPart_offer == null) {
            flag2 = 1;
          }
        }
      }
    });
    if (flag == 0 && flag2 == 0) {
      this.previewSubmit(cont);
    }
    else if (flag2 == 1) {
      this.validateModel2(content2);
    }
    else {
      this.validateModel(content);
    }
  }
  /**Validate Model */
  validateModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  validateModel2(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  validateProductItem(index: number) {
    this.updateOfferConfiguration();
  }

  applyOfferConfigurationDetails(event: any) {
    this.apply_copy([event]);
    this.toastr.success(this.utils.languageTranslator(constant.OFFER_CONFIGURATION.applySuccessMessage) + " " + event.coopName + " !. " + "Active Promos should be manually updated");
  }

  validateLowerBond(target: any) {
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().objective.lower_bound.length; i++) {
      if (this.offerConfigurationForm.getRawValue().objective.lower_bound[i].lower_bound_name == target.objective_name) {
        return true;
      }

    }
    return false;
  }

  validateProductCategory(product: any) {
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().product.max_offers.length; i++) {
      if (this.offerConfigurationForm.getRawValue().product.max_offers[i].product_item == product.category_id) {
        return true;
      }
    }
    return false;
  }
  validateDayPartCategory(dayPart: any) {
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().offer.daypart.length; i++) {
      if (this.offerConfigurationForm.getRawValue().offer.daypart[i].dayPart_item == dayPart.dayPart_id) {
        return true;
      }
    }
    return false;
  }

  validateMaximize(content: any) {
    this.editLowerBoundList();
    if (this.checkExistInLowerBond()) {
      this.triggerMaxWarningModel(content);
    } else {
      this.updateOfferConfiguration();
    }
  }

  removeLowerBondByIndex() {
    if (this.rmLowerBondIndex >= 0) {
      this.removeLowerBond(this.rmLowerBondIndex);
      this.modalService.dismissAll();
      if (this.offerConfigurationForm.getRawValue().objective.lower_bound.length == 0) {
        this.addLowerBond();
      }
    }

    this.updateOfferConfiguration()
    this.editLowerBoundList();
  }

  patchPreviousLBValue() {
    this.patchObjectiveDefaultValues();
    this.modalService.dismissAll();
    this.updateOfferConfiguration()
    this.editLowerBoundList();
  }

  rmLowerBondIndex: number = -1;
  checkExistInLowerBond() {
    for (let i = 0; i < this.offerConfigurationForm.getRawValue().objective.lower_bound.length; i++) {
      if (this.offerConfigurationForm.getRawValue().objective.lower_bound[i].lower_bound_name ==
        this.offerConfigurationForm.getRawValue().objective.maximize.objective_name) {
        this.rmLowerBondIndex = i;
        return true;
      }
    }
    return false;
  }

  get offerConfigureControl() {
    return this.offerConfigurationForm.controls;
  }

  get productControl() {
    return this.offerConfigurationForm.controls.product.controls
  }
  get promoControl() {
    return this.offerConfigurationForm.controls.offer.controls
  }


  /** model Validation */

  triggerMaxWarningModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  cancelModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  objectiveModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return constant.preview_page.pressEsc;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return constant.preview_page.byClickBack;
    } else {
      return `with: ${reason}`;
    }
  }

  cancelDismis() {
    this.modalService.dismissAll();
  }
  validateAddBound() {
    if (this.offerConfigurationForm.getRawValue().objective.lower_bound.length
      >= this.lowerBoundList.length) {
      return false;
    }
    return true;
  }
  validateAddDaypart() {
    if (this.offerConfigurationForm.getRawValue().offer.daypart.length
      >= this.offers_list[this.child_ohmID]?.child_node[0]?.data?.daypart?.length) {
      return false;
    }
    return true;
  }

  validateAddProductCategory() {
    if (!this.utils.isNullOrEmptyOrUndefined(this.offerConfigurationForm.getRawValue().product.max_offers)
      && !this.utils.isNullOrEmptyOrUndefined(this.offerConfigurationForm.getRawValue().product.product_item)) {
      if (this.offerConfigurationForm.getRawValue().product.max_offers.length
        >= this.offerConfigurationForm.getRawValue().product.product_item.length) {
        return false;
      }
    }
    return true;
  }

  /** Edit Configuration Restructure */
  validateEditOfferConfiguration(response: any) {
    this.offers_list = response.data.offer_list_data;
    let geo_list_items = response.data.geo_list_data;
    this.geolistappend = geo_list_items[0];
    this.child_ids = geo_list_items[1];
    this.count = this.child_ids.length - 1;
    this.offer_config_dictionary = response.data.offer_config_data;
    let default_values: any = geo_list_items[2];
    this.durMinValue = default_values[0];
    this.durMaxValue = default_values[1];
    this.min_depth_1 = default_values[2];
    this.max_depth_1 = default_values[3];
    this.min_depth_2 = default_values[4];
    this.max_depth_2 = default_values[5];
    this.noofpromos_min = default_values[6];
    this.noofpromos_max = default_values[7];
    this.getCoopList();
    setTimeout(() => {
      for (let i = 0; i < this.segmentList.length; i++) {
        for (let j = 0; j < this.segmentList[i].child_nodes.length; j++) {
          for (let k = 0; k < this.child_ids.length - 1; k++) {
            if (this.child_ids[k] == this.segmentList[i].child_nodes[j].ohm_id) {
              this.segmentList[i].child_nodes[j].selected = true;
            }
          }
        }
      }
      for (let i = 0; i < this.segmentList.length; i++) {
        for (let j = 0; j < this.promoChannelList.length; j++) {
          if (this.segmentList[i].ohm_id == this.promoChannelList[j].ohm_id) {
            this.SelectedGeo.push(this.promoChannelList[j]);
            break;
          }
        }
      }
      let z: any;
      let y: any = [];
      let seg: any;
      let index: any;
      for (let j = 0; j < this.segmentList.length; j++) {
        let x = this.segmentList[j].child_nodes;
        for (let i = 0; i < x.length; i++) {
          if ("selected" in x[i]) {
            y.push(x[i].ohm_id);
            y.push(x[i].coop_name);
            z = x[i];
            break;
          }
        }
        if (z != undefined || y.length != 0) {
          seg = this.segmentList[j];
          index = j;
          break;
        }
      }
      this.ohm_ids = [seg.child_nodes[0].ohm_id, seg.child_nodes[1].ohm_id];
      this.getCoopDetails(seg.coop_name, y[1], seg.ohm_id, y[0]);
      this.get_white_line(index, z);
      this.actcall = true;
    }, 1500)
    this.getConfigurationApiCall();
  }

  resetCompDiscount() {
    return this.offerConfigurationForm.get(constant.OFFER_CONFIGURATION.COMPETITION_DISCOUNTS) as FormArray;
  }
  getControlByName(controlName: string): FormControl {
    return this.offerConfigurationForm.get(controlName) as FormControl;
  }
  onKeyup(e: any, index: number) {
    if (e.target.value > 0
      || e.target.value < -5
      || e.target.value.length > 2) {
      e.target.value = 0;
    }
  }

  onDateChange() {
    this.offerConfiguration.start_date = this.datepipe.transform(this.offerConfigurationForm.getRawValue().period.period_start_date, constant.scenario_planner.StartDateTime) || '';
    this.selected_coop.data.start_date = this.offerConfiguration.start_date;
    this.updateOfferConfiguration();
  }

  /** Apply Function */
  onApplySelect(event: any) {
    this.appliedSegmentId.push(event.child_ohmID);
    this.applyOfferConfigurationDetails(event);
  }


  onApplySelectAll(event: any) {
    this.apply_copy(event);
    this.toastr.success(this.utils.languageTranslator(constant.OFFER_CONFIGURATION.applyAllSucessMessage) + " !. " + "Active Promos should be manually updated");
  }

  apply_copy(event: any) {
    for (let i = 0; i < event.length; i++) {
      if (event.child_ohmID != this.child_ohmID) {
        this.offers_list[event[i].child_ohmID].child_node[0].data.start_date = this.offers_list[this.child_ohmID].child_node[0].data.start_date;
        this.offers_list[event[i].child_ohmID].child_node[0].data.duration_min = this.offers_list[this.child_ohmID].child_node[0].data.duration_min;
        this.offers_list[event[i].child_ohmID].child_node[0].data.duration_max = this.offers_list[this.child_ohmID].child_node[0].data.duration_max;
        this.offers_list[event[i].child_ohmID].child_node[0].data.fixed_promos = [];
        this.offers_list[event[i].child_ohmID].child_node[0].data.daypart = this.offers_list[this.child_ohmID].child_node[0].data.daypart;
        this.offers_list[event[i].child_ohmID].child_node[0].data.max_Promos = this.offers_list[this.child_ohmID].child_node[0].data.max_Promos;
        this.offers_list[event[i].child_ohmID].child_node[0].data.maxi_list = this.offers_list[this.child_ohmID].child_node[0].data.maxi_list;
        this.offers_list[event[i].child_ohmID].child_node[0].data.obj_low_bound = this.offers_list[this.child_ohmID].child_node[0].data.obj_low_bound;
        this.offers_list[event[i].child_ohmID].child_node[0].data.objective = this.offers_list[this.child_ohmID].child_node[0].data.objective;
        this.offers_list[event[i].child_ohmID].child_node[0].data.objective_list = this.offers_list[this.child_ohmID].child_node[0].data.objective_list;
        this.offers_list[event[i].child_ohmID].child_node[0].data.objective_lower_bound = this.offers_list[this.child_ohmID].child_node[0].data.objective_lower_bound;
        this.offers_list[event[i].child_ohmID].child_node[0].data.prod = this.offers_list[this.child_ohmID].child_node[0].data.prod;
        this.offers_list[event[i].child_ohmID].child_node[0].data.product_categories = this.offers_list[this.child_ohmID].child_node[0].data.product_categories;
        this.offers_list[event[i].child_ohmID].child_node[0].data.product_categories_data = this.offers_list[this.child_ohmID].child_node[0].data.product_categories_data;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_list = this.offers_list[this.child_ohmID].child_node[0].data.promo_list;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_mechanics = this.offers_list[this.child_ohmID].child_node[0].data.promo_mechanics;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_mech_data = this.offers_list[this.child_ohmID].child_node[0].data.promo_mech_data;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_depth_1.lower_bound = this.offers_list[this.child_ohmID].child_node[0].data.promo_list.discount_depth[0] / 100;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_depth_1.upper_bound = this.offers_list[this.child_ohmID].child_node[0].data.promo_list.discount_depth[1] / 100;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_depth_2.lower_bound = this.offers_list[this.child_ohmID].child_node[0].data.promo_list.discount_depth_two[0] / 100;
        this.offers_list[event[i].child_ohmID].child_node[0].data.promo_depth_2.upper_bound = this.offers_list[this.child_ohmID].child_node[0].data.promo_list.discount_depth_two[1] / 100;
        this.offers_list[event[i].child_ohmID].child_node[0].data.no_promos.lower_bound = this.offers_list[this.child_ohmID].child_node[0].data.promo_list.no_of_offers[0];
        this.offers_list[event[i].child_ohmID].child_node[0].data.no_promos.upper_bound = this.offers_list[this.child_ohmID].child_node[0].data.promo_list.no_of_offers[1];
        this.offers_list[event[i].child_ohmID].child_node[0].data.selectedItemList = [...this.offers_list[this.child_ohmID].child_node[0].data.selectedItemList];
        this.offers_list[event[i].child_ohmID].child_node[0].data.selectedProductList = [...this.offers_list[this.child_ohmID].child_node[0].data.selectedProductList];
        this.offers_list[event[i].child_ohmID].child_node[0].data.selectedPromoList = [...this.offers_list[this.child_ohmID].child_node[0].data.selectedPromoList];
        this.offer_config_dictionary[event[i].child_ohmID] = JSON.parse(JSON.stringify(this.offerConfiguration));
        this.offer_config_dictionary[event[i].child_ohmID].child_ohm_id = event[i].child_ohmID;
        this.offer_config_dictionary[event[i].child_ohmID].coop_name = event[i].coopName;
        this.offer_config_dictionary[event[i].child_ohmID].fixed_promo_called = false;
      }
    }
  }

  onApplyDeSelect(event: any) {
    return true;
  }

  appliedSegmentId: any = [];

  toggleAccordian(event: any, index: any) {
    let element = event.target;
    element.classList.toggle("active");
    if (this.segmentList[index].isActive) {
      this.segmentList[index].isActive = false;
    } else {
      this.segmentList[index].isActive = true;
    }
    let panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
  /**expand geos */
  expand_geos(ee: any, i: any, seg: any, seglist: any) {
    setTimeout(() => {
      let element = ee.children[0];
      element.classList.add("active");
      let panel = element.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }, 100);
    if (i == this.segmentList.length - 1) {
      this.exp = false;
    }
    return true;
  }

  exportDownloadProductMapping() {
    this.offerPackageDetailService.exportGetProductMapping().subscribe((response: any) => {
      this.utils.downloadFile(response, 1)
    }, (error) => {
    })
  }
  exportDownloadMechanicDetails() {
    this.offerPackageDetailService.exportGetMechanicDetails().subscribe((response: any) => {
      this.utils.downloadPDFFile(response)
    }, (error) => {
    })
  }

  editButton = false;
  editForm!: FormGroup;
  errorText: any
  errorTextPrice: any
  clickPopup = true;
  scenarioUniqueId: any = undefined;
  durationData: any = []
  durationDrop: any = constant.scenario_name.durationDropdown
  promoID: any = []
  promoDrop: any = []
  promoDropData: any = []
  itemDrop: any = [{}]
  itemDropData: any = []
  promoChannelListModal: any = constant.scenario_name.promoChannelDropdown
  promoTypeList: any = constant.scenario_name.promoTypeListDropdown
  geoDrop: any = constant.scenario_name.geoData;
  promoMechChannelListModal: any = []
  isReadOnly = false
  lastUpdated: any
  index_fixed: any;

  formGroup() {

    this.editForm = this.fb.group({
      start_date: ["", [Validators.required]],
      duration: ["", [Validators.required]],
      geo: "",
      discount_channel: [""],
      promo_type: [""],
      discount_mechanic: ["", [Validators.required]],
      product_type: ["", [Validators.required]],
      items: ["", [Validators.required]],
      base_price: [""],
      min_discount_price: [""],
      max_discount_price: [""],
      discount_price: ["", [Validators.required]],
      discount_depth: ["", [Validators.required]],
      offer_id: [""],
      ohm_id: [""],
      dis_mech_id: [""],
      item_grp_id: [""],
    })

  }

  /**Select Settings duration dropdown*/
  durationDropdownSettings = {
    primaryKey: "id",
    labelKey: "weeks",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false,
    disabled: false,
  };

  /**Select Settings segment*/
  segmentDropdownSettingsModal = {
    primaryKey: "ohm_id",
    labelKey: "coop_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false,
    disabled: true
  };

  /**Select Settings channel */
  discountChannelSettings = {
    primaryKey: "promo_id",
    labelKey: "promo_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: false,
    classes: "myclass channel-class",
    showCheckbox: false,
    disabled: false
  };

  /**Select Settings Promo Type*/
  promoTypeDropdownSettings = {
    primaryKey: "promoTypeID",
    labelKey: "promoTypeDesc",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false,
    disabled: true
  };

  /**Select Settings Discount Mechanic*/
  mechanicDropdownSettings = {
    primaryKey: "dis_mech_id",
    labelKey: "dis_mech_desc",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false
  };

  /**Select Settings product*/
  productDropdownSettingsModal = {
    primaryKey: "promo_type_id",
    labelKey: "promo_type_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false
  };

  /**Select Settings item*/
  itemDropdownSettings1 = {
    primaryKey: "item_id",
    labelKey: "item_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false
  };

  /** Discount Channel  */
  discountChannelSettingsDisable = {
    primaryKey: "promo_id",
    labelKey: "promo_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: false,
    classes: "myclass channel-class",
    showCheckbox: false,
    disabled: true
  };

  // Item show popup
  showItemModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  clearError() {
    this.errorText = '',
      this.errorTextPrice = ''
    this.editForm.controls.discount_depth.reset("");
    this.editForm.controls.discount_price.reset("");
  }


  addScenarioPopup() {
    this.editForm.reset()
    this.editForm.patchValue({
      geo: [{
        ohm_id: this.parent_ohm_id,
        coop_name: this.coopName
      }],
      ohm_id: this.parent_ohm_id,
      discount_channel: [{
        promo_id: constant.scenario_name.promoChannelDropdown[0].promo_id,
        promo_name: constant.scenario_name.promoChannelDropdown[0].promo_name
      }],
      promo_type: [{
        promoTypeID: this.child_ohmID,
        promoTypeDesc: this.subSegment_coop_name
      }],
    })
    this.editButton = false
    this.showItemModel(this.editModal);
    this.promoMechDto();
    this.clearError();
  }

  /** Close model and clear the data */
  dismissData() {
    this.editButton = false;
    this.clickPopup = false;
    this.scenarioUniqueId = undefined;
    this.modalService.dismissAll();
    this.clearError()
  }

  /**Validation for discount */
  validationDepth() {
    let val: any
    if (this.editForm.getRawValue().discount_price != '' && this.editForm.getRawValue().min_discount_price != '') {
      if (this.editForm.getRawValue().discount_price < this.editForm.getRawValue().min_discount_price) {
        val = 'error_discount_price'
      }
    }
    return val
  }

  onDurationClick() {
    this.durationData = this.durationDrop.map((val: any, index: number) => ({ id: index, weeks: val }));
  }

  /*Duration Select*/
  durationStore: any = [];
  onDurationSelect(event: any) {
    this.act_enddate = this.addWeeks(event.weeks, new Date(this.datepipe.transform(this.editForm.getRawValue().start_date, constant.scenario_planner.StartDateTime) || ''));
    this.isDisableddd = false;
    this.isDisable = false;
    this.errorTextPrice = '';
    if (this.act_enddate <= this.check_st_date) {
      this.errorTextPrice = 'Date/ Duration must be changed';
      this.toastr.error('Date/ Duration must be changed');
      this.isDisableddd = true;
      this.isDisable = true;
    }
    this.durationStore.push(event.weeks);
    this.editForm.patchValue({
      duration: [event],
    });
  }

  resetPromoType() {
    this.editForm.patchValue({
      promo_type: [],
      discount_mechanic: [],
      product_type: [],
      discount_depth: '',
      base_price: '',
      min_discount_price: '',
      max_discount_price: '',
      discount_price: '',
      items: []
    });
    this.promoMechChannelListModal = [];
    this.promoDropData = [];
    this.itemDropData = [];
    this.clearError()
  }

  resetDiscountMech() {
    this.editForm.patchValue({
      discount_mechanic: [],
      product_type: [],
      discount_depth: '',
      base_price: '',
      min_discount_price: '',
      max_discount_price: '',
      discount_price: '',
      items: []
    });
    this.promoMechChannelListModal = [];
    this.promoDropData = [];
    this.itemDropData = [];
    this.clearError()
  }

  /** service call dto get promo mechanic list*/
  promoMech(ohm_id: any, promoTypeSelected: any) {
    this.scenarioservice.getPromoMechService(ohm_id, promoTypeSelected).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.promoMechChannelListModal = response.data
      }
    }, (error) => {
      this.toastr.error(error.error.data);
    })

  }

  promoMechDto() {
    let ohm_id: number = this.parent_ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    this.promoMech(ohm_id, promoTypeSelected);
  }

  onChangePromoTypeSelect(event: any) {
    this.editForm.patchValue({
      promo_type: [{ promoTypeID: event.promoTypeID, promoTypeDesc: event.promoTypeDesc }],
    })
    this.resetDiscountMech();
    this.promoMechDto();
  }

  resetProductType(event: any) {
    this.editForm.patchValue({
      discountMechanicSelect: [{ dis_mech_id: event.promoTypeID, dis_mech_desc: event.discount_mechanic }],
      product_type: [],
      discount_depth: '',
      base_price: '',
      min_discount_price: '',
      max_discount_price: '',
      discount_price: '',
      items: []
    })

    this.promoDropData = [];
    this.itemDropData = [];
    this.clearError()
  }

  /** service call dto get Product list*/
  productType(promoTypeSelected: any, ohm_id: any, discountMechanicSelected: any) {
    this.scenarioservice.getPromoTypeService(promoTypeSelected, ohm_id, discountMechanicSelected).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.promoDrop = response.data;
        this.promoDropData = this.promoDrop.map((val: any, index: number) => ({ promo_type_id: index, promo_type_name: val }));
      }
    });
  }

  productTypeDto() {
    let ohm_id: number = this.parent_ohm_id
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    let discountMechanicSelected: any = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    this.productType(promoTypeSelected, ohm_id, discountMechanicSelected);
  }

  onChangeMechanicSelect(event: any) {
    this.editForm.patchValue({
      discount_mechanic: [{ dis_mech_id: event.dis_mech_id, dis_mech_desc: event.dis_mech_desc }],
      dis_mech_id: event.dis_mech_id,
    })
    this.resetProductType(event);
    this.productTypeDto();
  }

  /** From Reset */
  resetItems() {
    this.editForm.patchValue({
      discount_depth: '',
      base_price: '',
      min_discount_price: '',
      max_discount_price: '',
      discount_price: '',
      items: []
    });
    this.itemDropData = [];
    this.clearError()
  }

  /** service call   get Item list*/
  getItem(promoTypeSelected: any, ohm_id: any, discountMechanicSelected: any, productType: any) {
    this.scenarioservice.getItemService(promoTypeSelected, ohm_id, discountMechanicSelected, productType).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.itemDrop = response.data;
        this.itemDropData = this.itemDrop.map((val: any) => ({ item_id: val.offer_id, item_name: val.promo_name }));
      }
    });
  }

  getItemDto() {
    let ohm_id: number = this.parent_ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    let discountMechanicSelected: any = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    let productType: any = this.editForm.getRawValue().product_type[0].promo_type_name;
    this.getItem(promoTypeSelected, ohm_id, discountMechanicSelected, productType)
  }

  /**Change Product Type */
  onChangeProductType(event: any) {
    this.editForm.patchValue({
      product_type: [{ promo_type_id: event.promo_type_id, promo_type_name: event.promo_type_name }],
    })
    this.resetItems()
    this.getItemDto();
  }

  resetFormSelItem() {
    this.editForm.patchValue({
      discount_depth: '',
      base_price: '',
      min_discount_price: '',
      max_discount_price: '',
      discount_price: '',
    });
    this.clearError()
  }

  loadPrices(priceData: any) {
    this.editForm.patchValue({
      base_price: priceData.base_price,
      min_discount_price: priceData.min_offer_price,
      max_discount_price: priceData.max_offer_price,
      offer_id: priceData.offer_id
    })

  }

  /** get Item details */
  getItemPriceService(promoTypeSelected: any, ohm_id: any, discountMechanicSelected: any, productType: any, offer_id: any) {
    this.scenarioservice.getItemPriceService(promoTypeSelected, ohm_id, discountMechanicSelected, productType, offer_id).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.loadPrices(response.data[0]);
      }
    },
      (error) => {
        this.toastr.error(error.error.status);
      }
    );
  }

  getItemPrices(event: any) {
    let ohm_id: number = this.parent_ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    let discountMechanicSelected: any = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    let productType: any = this.editForm.getRawValue().product_type[0].promo_type_name;
    let offer_id: any = event.item_id;
    this.getItemPriceService(promoTypeSelected, ohm_id, discountMechanicSelected, productType, offer_id);
  }

  /**Change Item */
  onChangeItem(event: any) {
    this.editForm.patchValue({
      items: [{ item_id: event.item_id, item_name: event.item_name }],
    })
    this.resetFormSelItem();
    this.getItemPrices(event);
  }



  warningMessage(min_discount: any, max_discount: any, discount_price: any, regular_price: any) {
    this.errorTextPrice = ""
    if (discount_price < min_discount) {
      this.errorTextPrice = this.utils.languageTranslator(constant.scenario_name.warning_min)
      this.isDisable = true;

    } else if (discount_price > max_discount && discount_price <= regular_price) {
      this.errorTextPrice = this.utils.languageTranslator(constant.scenario_name.warning_high)
      this.isDisable = true;
    } else if (discount_price > regular_price) {
      this.errorTextPrice = this.utils.languageTranslator(constant.scenario_name.warning_reg_high)
      this.isDisable = true;
    } else if (this.isDisabledd == true || this.isDisableddd == true) {
      this.errorTextPrice = this.utils.languageTranslator(constant.scenario_name.warning_start_date)
      this.isDisable = true;
    } else {
      this.errorTextPrice = ""
      this.isDisable = false;

    }
    this.validationDepth();
  }

  /**Change discount price */
  changeDiscountPrice(event: any) {
    this.editForm.patchValue({ discount_price: event.target.value })

    if (this.editForm.getRawValue().base_price != '' && this.editForm.getRawValue().base_price != undefined) {
      this.calculateDepth(this.editForm.getRawValue().base_price, event.target.value)
      this.warningMessage(this.editForm.getRawValue().min_discount_price, this.editForm.getRawValue().max_discount_price, event.target.value, this.editForm.getRawValue().base_price)
    }
    if (event.target.value == undefined || event.target.value == '') {
      this.editForm.patchValue({ discount_depth: '' })
    }
    event.preventDefault();
    this.validationDepth();
  }

  /**calculate Discount Depth */
  calculateDepth(regprice: any, discountPrice: any,) {
    const discountDepth = (1 - (discountPrice / regprice)) * 100
    this.editForm.patchValue({ discount_depth: discountDepth.toFixed(0) })

  }

  onDateChangeactive() {
    this.act_stdate = new Date(this.datepipe.transform(this.editForm.getRawValue().start_date, constant.scenario_planner.StartDateTime) || '');
    this.isDisabledd = false;
    this.isDisable = false;
    this.errorTextPrice = '';
    if (this.act_stdate >= this.check_end_date) {
      this.errorTextPrice = 'Date must be changed';
      this.toastr.error('Date must be changed');
      this.isDisabledd = true;
      this.isDisable = true;
    }
  }

  /**Change Discount Depth */
  changeDiscountDepth(event: any) {
    this.editForm.patchValue({ discount_depth: event.target.value })
    if (this.editForm.getRawValue().base_price != '' && this.editForm.getRawValue().base_price != undefined) {
      this.calculatePrice(this.editForm.getRawValue().base_price, event.target.value)
      this.validationDepth();
    }
    if (event.target.value == undefined || event.target.value == '') {
      this.editForm.patchValue({ discount_price: '' })
    }
    this.warningMessage(this.editForm.getRawValue().min_discount_price, this.editForm.getRawValue().max_discount_price, this.editForm.getRawValue().discount_price, this.editForm.getRawValue().base_price)
  }

  /**calculate Discount Price */
  calculatePrice(regprice: any, discountdepth: any) {
    const discountPrice = regprice - ((discountdepth / 100) * regprice)
    this.editForm.patchValue({ discount_price: discountPrice.toFixed(2) })
    return discountPrice.toFixed(2)
  }

  /**Omit char type text box */
  omit_char(event: any) {
    const keyChar = event.key;
    let allowCharacter: boolean;
    if (event.target.value.length < 0 || event.target.value.length > 11) {
      event.preventDefault();
    }
    if (keyChar === '-' && event.target.selectionStart !== 0) {
      allowCharacter = false;
    } else if (
      keyChar === 'Tab' ||
      keyChar === 'Enter' ||
      keyChar === 'Backspace' ||
      keyChar === 'ArrowLeft' ||
      keyChar === 'ArrowRight' ||
      keyChar === 'Delete'
    ) {
      allowCharacter = true;
    } else {
      allowCharacter = keyChar >= '0' && keyChar <= '9';
    }
    if (!allowCharacter) {
      event.preventDefault();
    }
  }

  /** Store Fixed Promos */
  storeSegmentConfig() {
    sessionStorage.setItem(constant.scenario_name.fixedPromos, JSON.stringify(this.fixed_Promo));
  }

  /** update the added segment config */
  updateAddSegment() {
    let addSegmentConfig: any = {} as any;
    addSegmentConfig.start_date = this.datepipe.transform(this.editForm.getRawValue().start_date, constant.scenario_planner.StartDateTime) || '';
    addSegmentConfig.duration = this.editForm.getRawValue().duration[0].weeks;
    addSegmentConfig.coop = this.coopName;
    addSegmentConfig.channel = this.editForm.getRawValue().discount_channel[0].promo_name;
    addSegmentConfig.promo_type = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    addSegmentConfig.dis_mech_desc = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    addSegmentConfig.product_type = this.editForm.getRawValue().product_type[0].promo_type_name;
    addSegmentConfig.offer_desc = this.editForm.getRawValue().items[0].item_name;
    addSegmentConfig.base_price = this.editForm.getRawValue().base_price;
    addSegmentConfig.min_offer_price = this.editForm.getRawValue().min_discount_price;
    addSegmentConfig.max_offer_price = this.editForm.getRawValue().max_discount_price;
    addSegmentConfig.offer_price = Number(this.editForm.getRawValue().discount_price);
    addSegmentConfig.discount_depth_per = this.editForm.getRawValue().discount_depth;
    addSegmentConfig.fixed_offer_id = this.editForm.getRawValue().offer_id;
    addSegmentConfig.offer_id_value = this.editForm.getRawValue().offer_id;
    addSegmentConfig.parent_ohm_id = this.parent_ohm_id;
    addSegmentConfig.child_ohm_id = this.editForm.getRawValue().ohm_id;
    if (!this.editButton) {
      addSegmentConfig.actions = "added";
      if (this.fixed_Promo)
        this.fixed_Promo.push(addSegmentConfig);
      if (!this.fixed_Promo) {
        this.fixed_Promo = [];
        this.fixed_Promo.push(addSegmentConfig);
      }
      this.selected_coop.data.fixed_promos = this.fixed_Promo;
      this.updateOfferConfiguration();
    }
    if (this.editButton) {
      addSegmentConfig.actions = "edited";
      this.fixed_Promo[this.index_fixed] = addSegmentConfig;
      this.selected_coop.data.fixed_promos = this.fixed_Promo;
      this.updateOfferConfiguration();
    }
    this.dismissData();
    this.isReadOnly = false;
    this.clearError();
  }

  editScenarioPopup() {
    this.editButton = true;
    this.editForm.reset()
    this.showItemModel(this.editModal);
  }

  editRow(index: any) {
    this.index_fixed = index;
    this.editForm.patchValue(this.patchEditValue(this.fixed_Promo[index]))
    this.promoMechDto();
    this.productTypeDto();
    this.getItemDto();
  }

  patchEditValue(fixed_offers: number) {
    let selScenarioConfig: any = fixed_offers;
    let editFormTemplate = {
      start_date: selScenarioConfig.start_date,
      duration: [{ id: 1, weeks: selScenarioConfig.duration }],
      geo: [{ ohm_id: selScenarioConfig.parent_ohm_id, coop_name: selScenarioConfig.coop }],
      discount_channel: [{ promo_id: 10, promo_name: selScenarioConfig.channel }],
      promo_type: [{ promoTypeID: 11, promoTypeDesc: selScenarioConfig.promo_type }],
      discount_mechanic: [{ dis_mech_id: 14, dis_mech_desc: selScenarioConfig.dis_mech_desc }],
      product_type: [{ promo_type_id: 12, promo_type_name: selScenarioConfig.item_grp_desc }],
      items: [{ item_id: 13, item_name: selScenarioConfig.offer_desc }],
      base_price: selScenarioConfig.base_price,
      min_discount_price: selScenarioConfig.min_offer_price,
      max_discount_price: selScenarioConfig.max_offer_price,
      discount_price: selScenarioConfig.offer_price,
      discount_depth: selScenarioConfig.discount_depth_per,
      offer_id: selScenarioConfig.offer_id_value,
      ohm_id: selScenarioConfig.child_ohm_id,
      dis_mech_id: selScenarioConfig.dis_mech_id,
      item_grp_id: selScenarioConfig.item_grp_id,
    }
    return editFormTemplate;
  }
  removeSegment(index: any) {
    this.fixed_Promo.splice(index, 1);
    this.updateOfferConfiguration();
  }
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
}
