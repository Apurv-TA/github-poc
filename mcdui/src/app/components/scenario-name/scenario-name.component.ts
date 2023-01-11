import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { ConstantService } from "src/app/services/constant.service";
import * as constant from '../../shared/constant/constant';
import { ScenarioNameService } from "../../services/scenario-name.service";
import { OfferRecommenderService } from "src/app/services/offer-recommender.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UtilService } from "src/app/services/util.service";
import { MatSort, Sort } from '@angular/material/sort';
import { UrlSecurityService } from "src/app/services/url-security.service";
import { MatPaginator } from "@angular/material/paginator";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { FixedPromosDataTable, scenarioDataTable } from "src/app/shared/interface/scenarioDataTable";
import { segData, SegmentConfig } from "src/app/shared/interface/scenarioConfig";
import { DOCUMENT } from '@angular/common';
import { browserRefresh } from './../../app.component';
import { backToScenarioName } from './../import-recommender/import-recommender.component'
import { ScenarioComparisionService } from "src/app/services/scenario-comparision.service";
import { PackageSummaryService } from "src/app/services/package-summary.service";
import { Subscription } from "rxjs";
import { ScenarioDiscountServiceService } from "src/app/services/scenario-discount-service.service";
@Component({
  selector: 'app-scenario-name',
  templateUrl: './scenario-name.component.html',
  styleUrls: ['./scenario-name.component.scss'],
})
export class ScenarioNameComponent implements OnInit {
  @ViewChild('confirmPopup') myModal: any;
  @ViewChild('addedit') editModal: any;
  @ViewChild('rulesData') rulesData: any;
  segmentConfig: SegmentConfig = {} as SegmentConfig;
  /** Form and Table */
  scenarioForm!: FormGroup;
  editForm!: FormGroup;
  scenarioValueChanges$: any;
  selectedLanguage: any
  dataSource!: any;
  dataSourceScenario!: any;
  dataCopy!: any
  displayedColumns: string[] = constant.scenario_name.competition_discount
  displayedColumnScenario: string[] = constant.scenario_name.scenario_table
  displayedColumnActivePromos: string[] = constant.scenario_name.scenario_table_active_promos
  scenarioData: any;
  filterData: any;
  var: any;
  respofli = [];
  respofspi = [];
  saveandsubmit: boolean = false;
  isDisable: boolean = false;

  /**Dropdown variable */
  promoChannelList: any = constant.scenario_name.promoChannelDropdown
  promoDrop: any = []
  segmentDrop: any = [{}]
  durationDrop: any = constant.scenario_name.durationDropdown
  promoTypeList: any = constant.scenario_name.promoTypeListDropdown
  brandDrop: any = [{}]
  promoMechChannelList: any = []
  promoID: any = []
  promoTypeID: any
  weekList: any = [{}]
  itemDrop: any = [{}]
  discountData: any = [{}]
  durationData: any = []
  promoDropData: any = []
  itemDropData: any = []
  /**Datepicker variable */
  date = new Date()
  endDate: any;

  /** Router Configuration */
  private getRouteParams: any;
  editAvailable = false;

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
  segmentDropdownSettings = {
    primaryKey: "ohm_id",
    labelKey: "coop_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false,
    disabled: false
  };
  /**Select Settings duration*/
  weekDropdownSettings = {
    primaryKey: "offer_duration_id",
    labelKey: "description",
    singleSelection: true,
    text: "",
    enableSearchFilter: false,
    classes: "myclass dropdown-duration",
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
    showCheckbox: false
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
  productDropdownSettings = {
    primaryKey: "promo_type_id",
    labelKey: "promo_type_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false
  };
  /**Select Settings item*/
  itemDropdownSettings = {
    primaryKey: "item_id",
    labelKey: "item_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false
  };
  /**Select Settings Brand*/
  brandDropdownSettings = {
    primaryKey: "competition_brand_id",
    labelKey: "competition_brand_name",
    singleSelection: true,
    text: "",
    enableSearchFilter: true,
    classes: "myclass custom-class",
    showCheckbox: false
  };
  /**Select Settings Comptition Discount*/
  discountDropdownSettings = {
    primaryKey: "competition_offer_id",
    labelKey: "competition_offer_name",
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
  /** import offer id  */
  offerIDImport: any
  localDataList: any = []
  closeResult: any
  /** Competition Variable */
  configList: any = {
    'discount_depth_min': 0,

  }
  errorText: any
  errorTextPrice: any
  errorTextComp: any
  errorTextActivePromos: any;

  /**Restructure */
  restructureSeg = new Map();
  start_date: any
  kfc_count = 0;
  bk_count = 0
  addActivePromoData: any = [];

  /** Scenario Table */
  @ViewChild('paginatorTable1', { static: true }) tableOnePaginator!: MatPaginator;
  @ViewChild('paginatorTable2', { static: true }) tableTwoPaginator!: MatPaginator;

  @ViewChild('table1', { read: MatSort, static: true }) sort: MatSort = new MatSort;
  @ViewChild('table2', { read: MatSort, static: true }) sort2: MatSort = new MatSort;
  scenarioTable: scenarioDataTable[] = [];

  /** Segment Config Details */
  mapSegmentConfigByUK = new Map();
  scenarioUniqueId: any = undefined;
  editButton = false;
  clickPopup = true;

  isCreateDiscount = false;
  searchString: string = '';

  /** date Declaration */
  minStartDate = new Date();
  maxStartDate = new Date();
  /**package length */
  discountLength: any = 0
  isReadOnly = false

  /** edit/copy variable */
  isCopyFlow: boolean = false;
  isEditFlow: boolean = false;
  offerConfigId: string = '';
  backToScenarioName: boolean = false;

  //setCurrency
  currencyCode: any
  userInfo: any;

  value_order = "asc";
  sort_value = "scenario_id";

  public subscription = new Subscription();

  constructor(
    private datepipe: DatePipe,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private offerRecommenderService: OfferRecommenderService,
    private scenarioservice: ScenarioNameService,
    private scenarioComparisionService: ScenarioComparisionService,
    public packageSummaryService: PackageSummaryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private util: UtilService,
    public translate: TranslateService,
    public constantService: ConstantService,
    private urlSecurityService: UrlSecurityService,
    private _liveAnnouncer: LiveAnnouncer,
    private scenarioDisountService: ScenarioDiscountServiceService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit() {
    this.document.body.classList.add('discount_planner');
    this.formGroup();
    this.currencyCode = constant.login_page.currencyCode;
    this.initialLanguageCall();
    this.discountLength = JSON.parse(sessionStorage.getItem(constant.scenario_name.offer_config_id) || '[]')
    this.initalAPICall();
    this.geoAll();
    this.scenarioPlannerFlag()
  }

  proceedToSave: boolean = false;
  promosEdited: boolean = false;
  fixed_Promos: any;
  scenarioFlag: any;

  scenarioPlannerFlag() {
    this.subscription.add(this.scenarioservice.getScenarioPlannerFlag().subscribe((resp: any) => {
      this.scenarioFlag = resp;
    },
      (error) => {

      }))
  }

  removeAddActivePromos(segmentConfig: any, fixed_Promos: any) {
    for (let i = 0; i < segmentConfig.offers.length; i++) {
      if (segmentConfig.offers[i].source == "fixed") {
        this.segmentConfig.offers.splice(i, 1);
        let counter = 0;
        for (let j = 0; j < this.segmentConfig.offers.length; j++) {
          this.segmentConfig.offers[j].scenario_unique_id = counter;
          counter = counter + 1;
        }

      }
    }

    this.reStructureFixedPromosSegment(fixed_Promos);

  }

  showPopup(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  reStructureFixedPromosSegment(segmentConfiguration: any) {

    for (let i = 0; i < segmentConfiguration.length; i++) {

      let segmentConfigurationList: any = {};
      segmentConfigurationList.start_date = segmentConfiguration[i].start_date;
      segmentConfigurationList.duration = segmentConfiguration[i].duration;
      segmentConfigurationList.coop = segmentConfiguration[i].geo;
      segmentConfigurationList.channel = segmentConfiguration[i].channel;
      segmentConfigurationList.promo_type = segmentConfiguration[i].promo_type;
      segmentConfigurationList.discount_mechanic = segmentConfiguration[i].dis_mech_desc;
      segmentConfigurationList.item_grp_desc = segmentConfiguration[i].item_grp_desc;
      segmentConfigurationList.offer_desc = segmentConfiguration[i].offer_desc;
      segmentConfigurationList.base_price = segmentConfiguration[i].base_price;
      segmentConfigurationList.min_discount_price = segmentConfiguration[i].min_offer_price;
      segmentConfigurationList.max_discount_price = segmentConfiguration[i].max_offer_price;
      segmentConfigurationList.offer_price = segmentConfiguration[i].promo_price;
      segmentConfigurationList.discount_depth = segmentConfiguration[i].discount_depth_per;
      segmentConfigurationList.discount_depth_per = segmentConfiguration[i].discount_depth_per,
        segmentConfigurationList.offer_id = segmentConfiguration[i].offer_id;
      segmentConfigurationList.ohm_id = segmentConfiguration[i].coop_ohm_id,
        segmentConfigurationList.dis_mech_id = segmentConfiguration[i].dis_mech_id,
        segmentConfigurationList.item_grp_id = segmentConfiguration[i].item_grp_id,
        segmentConfigurationList.impact_index = segmentConfiguration[i].impact_index,
        segmentConfigurationList.source = "fixed",
        this.segmentConfig.offers.push(segmentConfigurationList);

    }

    let counter = 0;
    for (let i = 0; i < this.segmentConfig.offers.length; i++) {

      this.segmentConfig.offers[i].scenario_unique_id = counter;
      counter = counter + 1;

    }
  }

  onDurationClick() {
    this.durationData = this.durationDrop.map((val: any, index: number) => ({ id: index, weeks: val }));
  }

  durationStore: any = [];
  // **Geo Select Select*/
  onDurationSelect(event: any) {
    this.durationStore.push(event.weeks);
    this.editForm.patchValue({
      duration: [event],
    });

    this.dateErrorMessage();

  }

  /**Calendar */
  minDate: any;
  dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      if (!date) {
        return false;
      }
      this.minDate = new Date(Date.now());
      let dat = new Date(date);
      const day = dat.getDay();
      return day == 1; // 1 means monday, 0 means sunday, etc.
    };

  /** Get Active Route Values */
  getActiveRouteParamsValue() {
    this.getRouteParams = this.activeRouter.params.subscribe(params => {
      this.validateFlowTypeByParams(params.type);
      var offerConfigId: any
      if (params.offerId != undefined) {
        offerConfigId = this.urlSecurityService.decryptUsingAES256(params.offerId).replace(/"/g, '');
        this.offerConfigId = offerConfigId;
      }

      if (!this.util.isNullOrEmptyOrUndefined(offerConfigId)) {
        if (browserRefresh || backToScenarioName) {
          this.editAvailable = true;
          this.dismiss()
        } else {
          this.editAvailable = true;
          this.isCreateDiscount = false;
          this.storeImport(offerConfigId)
          this.disableDropdown();
        }
      } else {
        sessionStorage.removeItem(constant.scenario_name.segmentConfig);
        sessionStorage.removeItem("FixedPromos");
        this.isCreateDiscount = true;
        this.removeSessionStorage();
        this.getActivePromoData();
        this.updateScenarioInterface()
        this.dataSource = new MatTableDataSource((this.scenarioForm.get(constant.scenario_name.comdisc) as FormArray).controls);
      }
    });
  }

  /** Intital API Calls */
  initalAPICall() {
    this.getConfigurationApiCall()
    this.getActiveRouteParamsValue();
  }


  /** service call get Segment based on the selected segment channel */
  getSegmentChannelApiCall(id: any) {
    this.offerRecommenderService.getSegmentChannelService(id).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.segmentDrop = response.data
        // this.validateOfflineChannel(id, this.segmentList);
      }
    }, (error) => {
      // this.segmentList = [];
    })
  }

  promoMechDto() {
    let ohm_id: number = this.editForm.getRawValue().geo[0].ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    this.promoMech(ohm_id, promoTypeSelected);
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
    this.promoMechChannelList = [];
    this.promoDropData = [];
    this.itemDropData = [];
    this.clearError()
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
    this.promoMechChannelList = [];
    this.promoDropData = [];
    this.itemDropData = [];
    this.clearError()
  }

  /** service call dto get promo mechanic list*/
  promoMech(ohm_id: any, promoTypeSelected: any) {
    this.scenarioservice.getPromoMechService(ohm_id, promoTypeSelected).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.promoMechChannelList = response.data
      }
    }, (error) => {
      this.toastr.error(error.error.data);
    })

  }

  productTypeDto() {

    let ohm_id: number = this.editForm.getRawValue().geo[0].ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    let discountMechanicSelected: any = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    this.productType(promoTypeSelected, ohm_id, discountMechanicSelected);
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


  /**Change Product Type */
  onChangeProductType(event: any) {
    this.editForm.patchValue({
      product_type: [{ promo_type_id: event.promo_type_id, promo_type_name: event.promo_type_name }],
    })
    this.resetItems()
    this.getItemDto();
  }


  getItemDto() {

    let ohm_id: number = this.editForm.getRawValue().geo[0].ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    let discountMechanicSelected: any = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    let productType: any = this.editForm.getRawValue().product_type[0].promo_type_name;
    this.getItem(promoTypeSelected, ohm_id, discountMechanicSelected, productType)
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


  /**Change Item */
  onChangeItem(event: any) {
    this.editForm.patchValue({
      items: [{ item_id: event.item_id, item_name: event.item_name }],
    })
    this.resetFormSelItem();
    this.getItemPrices(event);

  }

  getItemPrices(event: any) {
    let ohm_id: number = this.editForm.getRawValue().geo[0].ohm_id;
    let promoTypeSelected: any = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    let discountMechanicSelected: any = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    let productType: any = this.editForm.getRawValue().product_type[0].promo_type_name;
    let offer_id: any = event.item_id;
    this.getItemPriceService(promoTypeSelected, ohm_id, discountMechanicSelected, productType, offer_id);
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

  /** get min price details dto */
  getMinPriceDto(event: any, priceDetails: any) {
    let itemDto: any = {};
    itemDto.promo_id = this.editForm.getRawValue().discount_channel[0].promo_id;
    itemDto.segment_id = this.editForm.getRawValue().segment[0].segment_id;
    itemDto.promomech_id = this.editForm.getRawValue().discount_mechanic[0].promomech_id;
    itemDto.promo_type_id = this.editForm.getRawValue().product_type[0].promo_type_id;
    itemDto.item_id = event.item_id;
    this.getMinPriceService(itemDto, priceDetails)
  }

  /** get Min Price Service */
  getMinPriceService(payload: any, priceDetails: any) {
    this.scenarioservice.getMinPriceService(payload).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.loadPriceDto(response.data[0].min_discount_price, priceDetails)
      }
    });
  }

  loadPrices(priceData: any) {
    this.editForm.patchValue({
      base_price: priceData.base_price,
      min_discount_price: priceData.min_offer_price,
      max_discount_price: priceData.max_offer_price,
      offer_id: priceData.offer_id
    })

  }

  /** Load Item Price Details */
  loadPriceDto(minPrice: any, priceDetails: any) {
    let loadPriceDetails: any = {};
    loadPriceDetails = priceDetails;
    loadPriceDetails.min_discount_price = minPrice;
    this.loadPrice(loadPriceDetails);
  }



  /**
  * Form initialization
  */
  // create form with validators and dynamic rows array
  formGroup() {

    this.scenarioForm = this.formBuilder.group({
      scenario_name: ["", [Validators.required]],
      competition_discount: this.formBuilder.array([
        this.initCompetition()
      ])
    });

    this.editForm = this.formBuilder.group({
      start_date: [""],
      duration: [""],
      geo: [""],
      discount_channel: ["", [Validators.required]],
      promo_type: [""],
      discount_mechanic: ["", [Validators.required]],
      product_type: ["", [Validators.required]],
      items: ["", [Validators.required]],
      base_price: [""],
      min_discount_price: ["", [Validators.required]],
      max_discount_price: ["", [Validators.required]],
      discount_price: ["", [Validators.required]],
      discount_depth: ["", [Validators.required]],
      offer_id: [""],
      ohm_id: [""],
      dis_mech_id: [""],
      item_grp_id: [""],
      scenario_offer_id: [""],
    })

    // initialize stream on units
    this.scenarioValueChanges$ = this.scenarioForm.controls[constant.scenario_name.comdisc].valueChanges;
  }


  /** Language Translation */
  initialLanguageCall() {
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }


  /**
   * unsubscribe listener
   */
  ngOnDestroy(): void {
    this.document.body.classList.remove('discount_planner');
    this.scenarioValueChanges$.unsubscribe();
  }

  getControls() {
    return (this.scenarioForm.get(constant.scenario_name.seg) as FormArray).controls
  }


  getControlsComp() {
    return (this.scenarioForm.get(constant.scenario_name.comdisc) as FormArray).controls
  }

  validatepromos(model: any) {
    this.segmentConfig.channel = "Non Digital Mass";
    this.scenarioservice.validateScenarioSave(this.segmentConfig).subscribe
      ((response: any) => {
        if (response.http_code == 200) {
          this.saveandsubmit = true;
          this.toastr.success("Validation Successful");
        }

      }, (failure) => {
        if (failure.error.http_code == 400) {
          this.toastr.error(failure.error.status);
          this.showItemModel(this.rulesData);
          if (failure.error.data.same_promos_validation == "Validation Successful") {
            if (failure.error.data.common_items_validation.length > 0) {
              this.respofli = failure.error.data.common_items_validation;
              for (let i = 0; i < this.scenarioTable.length; i++) {
                for (let j = 0; j < this.respofli.length; j++) {
                  if (this.scenarioTable[i]['offer_id'] == this.respofli[j]['offer_id'] && this.scenarioTable[i]['geo'] == this.respofli[j]['geo_name']) {
                    this.scenarioTable[i]['isDuplicate'] = true;
                  }
                }

                this.dataSourceScenario = new MatTableDataSource(this.scenarioTable);
                this.dataSourceScenario.paginatconsole.logor = this.tableTwoPaginator;
              }
              for (let i = 0; i < this.scenarioTableFixedPromos.length; i++) {
                for (let j = 0; j < this.respofli.length; j++) {
                  if (this.scenarioTableFixedPromos[i]['offer_id'] == this.respofli[j]['offer_id'] && this.scenarioTableFixedPromos[i]['geo'] == this.respofli[j]['geo_name']) {
                    this.scenarioTableFixedPromos[i]['isDuplicate'] = true;
                  }
                }
                this.dataSourceScenarioFixedPromos = new MatTableDataSource(this.scenarioTableFixedPromos);
                this.dataSourceScenarioFixedPromos.paginator = this.tableOnePaginator;
              }
            }
            else {
              // console.log("entered into geo");
              if (failure.error.data.geo_validation == "Validation Successful") {
                if (failure.error.data.recommend_date_validation.length > 0) {
                  // console.log("entered into date");
                  this.respofli = failure.error.data.recommend_date_validation;
                  for (let i = 0; i < this.scenarioTable.length; i++) {
                    for (let j = 0; j < this.respofli.length; j++) {
                      if (this.scenarioTable[i]['offer_id'] == this.respofli[j]) {
                        this.scenarioTable[i]['isDuplicate'] = true;
                      }
                    }

                    this.dataSourceScenario = new MatTableDataSource(this.scenarioTable);
                    this.dataSourceScenario.paginator = this.tableTwoPaginator;
                  }
                  for (let i = 0; i < this.scenarioTableFixedPromos.length; i++) {
                    for (let j = 0; j < this.respofli.length; j++) {
                      if (this.scenarioTableFixedPromos[i]['offer_id'] == this.respofli[j]) {
                        this.scenarioTableFixedPromos[i]['isDuplicate'] = true;
                      }
                    }
                    this.dataSourceScenarioFixedPromos = new MatTableDataSource(this.scenarioTableFixedPromos);
                    this.dataSourceScenarioFixedPromos.paginator = this.tableOnePaginator;
                  }
                }
              }
            }

          }
          else {
            this.respofspi = failure.error.data.same_promos_items;
            for (let i = 0; i < this.scenarioTable.length; i++) {
              for (let j = 0; j < this.respofspi.length; j++) {
                if (this.scenarioTable[i]['offer_id'] == this.respofspi[j]['offer_id'] && this.scenarioTable[i]['start_date'] == this.respofspi[j]['start_date']) {
                  this.scenarioTable[i]['isDuplicate'] = true;
                }
              }

              this.dataSourceScenario = new MatTableDataSource(this.scenarioTable);
              this.dataSourceScenario.paginator = this.tableTwoPaginator;
            }
            for (let i = 0; i < this.scenarioTableFixedPromos.length; i++) {
              for (let j = 0; j < this.respofspi.length; j++) {
                if (this.scenarioTableFixedPromos[i]['offer_id'] == this.respofspi[j]['offer_id'] && this.scenarioTableFixedPromos[i]['start_date'] == this.respofspi[j]['start_date']) {
                  this.scenarioTableFixedPromos[i]['isDuplicate'] = true;
                }
              }
              this.dataSourceScenarioFixedPromos = new MatTableDataSource(this.scenarioTableFixedPromos);
              this.dataSourceScenarioFixedPromos.paginator = this.tableOnePaginator;
            }
          }


        }


      }

      )

  }
  /**
   * Save form data
   */
  save(model: any, isValid: boolean, e: any) {
    let calculateId: any = []
    sessionStorage.setItem(constant.login_page.calculate_id_scenario, calculateId)
    //Jan Release empty competition discount
    this.segmentConfig.competition_promo = [];
    //remove above line to send data backend
    this.segmentConfig.channel = "Non Digital Mass";

    // CHECK
    if (this.isEditFlow) {
      this.updateScenarioDto();
    } else {
      this.saveScenario();
    }
    // }
    e.preventDefault();
  }
  pad2(n: any) { return n < 10 ? '0' + n : n }

  saveScenario() {
    this.userInfo = JSON.parse(sessionStorage.getItem('loginResponse') || '{}');
    let date = new Date();
    let time_stmp = date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) + '-' + this.pad2(date.getDate()) + ' ' + this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes());
    if (this.segmentConfig.scenario_name == '') {
      this.segmentConfig.scenario_name = 'Scenario_' + this.userInfo.user_info.first_name + ' ' + this.userInfo.user_info.last_name + '_' + time_stmp;
      this.scenarioDisountService.setScenarioName(this.segmentConfig.scenario_name, 'scenario-name');
    }
    else {
      this.segmentConfig.scenario_name += '_' + this.userInfo.user_info.first_name + ' ' + this.userInfo.user_info.last_name + '_' + time_stmp;
      this.scenarioDisountService.setScenarioName(this.segmentConfig.scenario_name, 'scenario-name');
    }
    this.scenarioservice.getSaveService({ "data": [this.segmentConfig] }).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        sessionStorage.setItem(constant.login_page.offerConfigId, response.data)
        this.scenaioResult(response.data.scenario_id)
      }
    }, (failure) => {
      if (failure.error.http_code == constant.login_page.error_code_400) {
        this.toastr.error(this.util.languageTranslator(constant.scenario_name.warning_save))
      } else {
        this.toastr.error(failure.error.data);
      }
    })
  }

  updateScenarioDto() {
    this.segmentConfig.scenario_id = this.offerConfigId;  //Commented for updated interface CHECK
    this.segmentConfig.offers = [...this.segmentConfig.offers, ...this.deletedSegmentConfig];
    this.updateSenario();
  }

  updateSenario() {
    this.scenarioservice.updateScenarioService({ "data": [this.segmentConfig] }).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.scenaioResult(response.data.scenario_id)
      }
    }, (failure) => {
      if (failure.error.http_code == constant.login_page.error_code_400) {
        this.toastr.error(this.util.languageTranslator(constant.scenario_name.warning_save))
      } else {
        this.toastr.error(failure.error.data);
      }
    })
  }


  /**
  * save data Iterations
  */
  validateScenarioConfig() {

    let validateScenarioConfig: boolean = true;

    let segmentConfig: any = []
    for (let i = 0; i < this.segmentConfig.offers.length; i++) {
      if (segmentConfig.length >= 1) {
        let checkDuplicate = segmentConfig.filter((data: any) =>
          data.offer_desc[0].item_code == this.segmentConfig.offers[i].offer_desc[0].item_code)
        if (checkDuplicate.length > 0) {
          this.toastr.error(this.util.languageTranslator(constant.scenario_name.warning_save))
          validateScenarioConfig = false;
          break;
        }
      }

      if (!(this.segmentConfig.offers[i].discount_mechanic.promomech_code != constant.scenario_name.priceof1
        || this.segmentConfig.offers[i].discount_mechanic.promomech_code.substring(0, 4) == constant.scenario_name.checkThreshold)) {
        if (this.configList.discount_depth_min > this.segmentConfig.offers[i].discount_depth
          || this.configList.discount_depth_max < this.segmentConfig.offers[i].discount_depth) {
          validateScenarioConfig = false;
          this.toastr.error(this.util.languageTranslator(constant.scenario_name.depth_val) + this.configList.discount_depth_min + '%' + this.util.languageTranslator(constant.scenario_name.depth_val_last) + this.configList.discount_depth_max + '%');
          break;
        }


        if (this.segmentConfig.offers[i].offer_price < this.segmentConfig.offers[i].min_discount_price) {
          validateScenarioConfig = false;
        } else if (this.segmentConfig.offers[i].base_price < this.segmentConfig.offers[i].offer_price) {
          validateScenarioConfig = false;

        }
      }


      segmentConfig.push(this.segmentConfig.offers[i])
    }

    let compDiscountConfig: any = []
    for (let i = 0; i < this.segmentConfig.competition_promo.length; i++) {
      let checkDuplicate = compDiscountConfig.filter((data: any) =>
        data.competition_offer_id == this.segmentConfig.competition_promo[i].competition_offer_id &&
        data.competition_brand_id == this.segmentConfig.competition_promo[i].competition_brand_id
      )
      if (checkDuplicate.length > 0) {
        this.toastr.error(this.util.languageTranslator(constant.scenario_name.warning_comp_data))
        validateScenarioConfig = false;
        break;
      }

      compDiscountConfig.push(this.segmentConfig.competition_promo[i])
    }

    /** validate duplicate isAvaliable in Scenario Tables */
    for (let i = 0; i < this.scenarioTable.length; i++) {
      if (this.scenarioTable[i].isDuplicate) {
        validateScenarioConfig = false;
        this.toastr.error(this.util.languageTranslator(constant.scenario_name.warning_save))
        break;
      }
    }


    /** assign 0 for non mandatory records */
    if (validateScenarioConfig) {
      for (let i = 0; i < this.segmentConfig.offers.length; i++) {
        this.segmentConfig.offers[i].min_discount_price = !this.util.isNullOrEmptyOrUndefined(this.segmentConfig.offers[i].min_discount_price) ? this.segmentConfig.offers[i].min_discount_price : 0;
        this.segmentConfig.offers[i].max_discount_price = !this.util.isNullOrEmptyOrUndefined(this.segmentConfig.offers[i].max_discount_price) ? this.segmentConfig.offers[i].max_discount_price : 0;
        this.segmentConfig.offers[i].offer_price = !this.util.isNullOrEmptyOrUndefined(this.segmentConfig.offers[i].offer_price) ? this.segmentConfig.offers[i].offer_price : 0;
        this.segmentConfig.offers[i].base_price = !this.util.isNullOrEmptyOrUndefined(this.segmentConfig.offers[i].base_price) ? this.segmentConfig.offers[i].base_price : 0;
        this.segmentConfig.offers[i].discount_depth = !this.util.isNullOrEmptyOrUndefined(this.segmentConfig.offers[i].discount_depth) ? this.segmentConfig.offers[i].discount_depth : 0;
      }
    }

    return validateScenarioConfig;
  }

  /** competition form builder */
  private initCompetition() {
    return this.formBuilder.group({
      competition_brand_name: [""],
      discount: [""],
      discount_depth: [""],
    });
  }

  private getCompetition() {
    return this.formBuilder.group({
      competition_brand_name: ["", Validators.required],
      discount: ["", Validators.required],
      discount_depth: ["", Validators.required],
    });
  }


  /** Add Competition */
  addCompetition() {
    const control = <FormArray>this.scenarioForm.controls[constant.scenario_name.comdisc];
    control.push(this.getCompetition());
    this.dataSource = new MatTableDataSource((this.scenarioForm.get(constant.scenario_name.comdisc) as FormArray).controls);
    this.compDiscountSessionMaintain()
  }

  /*** Remove Competition */
  removeCompetition(i: number) {
    const control = <FormArray>this.scenarioForm.controls[constant.scenario_name.comdisc];
    control.removeAt(i);
    this.brandDrop = this.brandDrop
    this.dataSource = new MatTableDataSource((this.scenarioForm.get(constant.scenario_name.comdisc) as FormArray).controls);
    this.compDiscountSessionMaintain()
  }

  deletedSegmentConfig: any = [];
  /**
   * Remove   from form on click delete button
   */
  removeSegment(scenario_unique_id: number, source: string = 'recommended') {
    let index: number = -1;
    // console.log(this.segmentConfig,this.scenarioTableFixedPromos);
    for (let i = 0; i < this.segmentConfig.offers.length; i++) {
      if (scenario_unique_id == this.segmentConfig.offers[i].scenario_unique_id) {
        index = i;
        this.segmentConfig.offers[i].actions = "deleted";
        let selScenarioConfig: any = this.mapSegmentConfigByUK.get(scenario_unique_id)[0];
        this.deletedSegmentConfig.push(selScenarioConfig);
        break;
      }
    }
    if (index >= 0) {
      this.segmentConfig.offers.splice(index, 1);
    }
    this.storeSegmentConfig();
    this.configureDataSource(this.segmentConfig.offers, source);
    if (source == 'fixed')
      this.configureDataSource(this.segmentConfig.offers, 'recommended');
    if (source == 'recommended')
      this.configureDataSource(this.segmentConfig.offers, 'fixed');
    this.dataSourceScenario.filter = this.searchString.trim().toLowerCase();
    this.promosEdited = true;
    this.proceedToSave = false;
    this.saveandsubmit = false;
    this.validatepromos("ss");
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

  /** Filter Payload */
  filterPayload() {
    var payload = {
      scenario_id: this.offerConfigId,
      scenario_name: "",
      start_date: "",
      geo: "",
      promo_type: "",
      order_value: this.value_order,
      sort_column: this.sort_value

    }
    return payload;
  }

  scenarioNameSave: any;
  /**Edit API Call */
  editScenario(offerID: any) {
    // let payload = { "offer_config_id": offerID }
    let payload = offerID
    if (this.isEditFlow == true || this.isCopyFlow == true) {
      this.scenarioComparisionService.getScenarioslist(this.filterPayload(), constant.preview_page.one, 5).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          this.scenarioNameSave = response.data.list_of_scenario[0].scenario_name;
          this.updateScenarioInterface(response.data.list_of_scenario[0].offers);
        }
      }, (error) => {
        this.toastr.error(error.error.data);
      })
    }
    else {
      this.scenarioservice.getEditService(payload).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          this.updateScenarioInterface(response.data);
        }
      }, (error) => {
        this.toastr.error(error.error.data);
      })
    }
  }


  loadImportScenario(offerID: any) {
    /**Load API Call */
    let payload = offerID
    this.scenarioservice.getEditService(payload).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.updateScenarioInterface(response.data);
      }
    }, (error) => {
      this.toastr.error(error.error.data);
    })
  }


  /**Multiple Time import from session form */
  patchFormDetails(segmentConfig: SegmentConfig) {
    /** Form Reset */
    //  this.scenarioForm.reset()
    // let startDate: string = '';
    // startDate = segmentConfig.start_date
    // this.start_date = this.datepipe.transform(startDate, constant.scenario_planner.dateTime) || ''


    /** From Patch */
    this.scenarioForm.patchValue({
      scenario_name: segmentConfig.scenario_name,
      // discount_duration: segmentConfig.discount_duration,
      // start_date: new Date(segmentConfig.start_date),
    })



    let compDiscount: any = [];
    for (let i = 0; i < segmentConfig.competition_promo.length; i++) {

      compDiscount.push(
        {
          competition_brand_name: [{
            'competition_brand_id': segmentConfig.competition_promo[i].competition_brand_id,
            'competition_brand_name': segmentConfig.competition_promo[i].competition_brand_name
          }],
          discount: [{
            'competition_offer_id': segmentConfig.competition_promo[i].competition_offer_id,
            'competition_offer_name': segmentConfig.competition_promo[i].competition_offer_name
          }],
          discount_depth: segmentConfig.competition_promo[i].discount_depth,
        }
      )
    }


    const competitionControl: any = <FormArray>this.scenarioForm.controls[constant.scenario_name.comdisc];
    competitionControl.controls = []
    for (let i = 0; i < segmentConfig.competition_promo.length; i++) {
      competitionControl.push(this.getCompetition());
    }
    this.dataSource = new MatTableDataSource((this.scenarioForm.get(constant.scenario_name.comdisc) as FormArray).controls);
    this.scenarioForm.patchValue({ competition_discount: compDiscount });

  }

  /** Get Weak List based on the duration */
  getWeakList(discount_duration: any) {
    let weakList: any = [];
    for (let i = 0; i < this.weekList.length; i++) {
      if (this.weekList[i].offer_duration_id == discount_duration) {
        weakList = [this.weekList[i]];
        break;
      }
    }
    return weakList;
  }


  /** Maintain session offerid */
  storeImport(offerID: any) {
    let offerid = JSON.parse(sessionStorage.getItem(constant.scenario_name.offer_config_id) || '[]')
    if (offerid.length > 0) {
      if (offerid.indexOf(offerID) == -1) {
        this.offerIDImport = offerID
        offerid.push(offerID)
        if (offerid.length > 0) {
          this.loadImportScenario(offerID)
        }
      } else {
        this.offerIDImport = offerID
        if (this.discountLength.length < 5) {
          setTimeout(() => {
            this.showItemModel(this.myModal);
          }, 100);
        } else {
          this.dismiss()
        }
      }
    } else {
      offerid.push(offerID)
      this.editScenario(offerID)
    }
    sessionStorage.setItem(constant.scenario_name.offer_config_id, JSON.stringify(offerid));
    this.discountLength = JSON.parse(sessionStorage.getItem(constant.scenario_name.offer_config_id) || '[]')
  }



  // Item show popup
  showItemModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  /**Again Import form duplicate data */
  patchScenario() {
    let offerid = JSON.parse(sessionStorage.getItem(constant.scenario_name.offer_config_id) || '[]')
    offerid.push(this.offerIDImport)
    sessionStorage.setItem(constant.scenario_name.offer_config_id, JSON.stringify(offerid))
    this.discountLength = JSON.parse(sessionStorage.getItem(constant.scenario_name.offer_config_id) || '[]')
    this.loadImportScenario(this.offerIDImport)
    this.modalService.dismissAll();
  }


  dismiss() {
    this.editButton = false
    this.updateScenarioInterface()
    this.modalService.dismissAll();
  }

  /**Competition Discount Validation */
  onChangeDiscount(event: any, index: any) {
    this.findDuplicate(index)
    this.compDiscountSessionMaintain()
  }


  onChangeBrand(event: any, index: any) {
    this.findDuplicate(index)
    this.compDiscountSessionMaintain()
  }


  /**Find Duplicat data */
  findDuplicate(index: any) {
    const formControlValues: any = <FormArray>this.scenarioForm.controls[constant.scenario_name.comdisc];
    let myArray = this.getControlsComp()
    if (myArray.length > 1) {
      if (formControlValues.value[index].discount != '') {
        if (formControlValues.value[index].discount[0].competition_offer_id != '' && formControlValues.value[index].competition_brand_name[0].competition_brand_id != '') {
          let test = myArray.filter((data: any) => data.value.discount[0].competition_offer_id == formControlValues.value[index].discount[0].competition_offer_id && data.value.competition_brand_name[0].competition_brand_id == formControlValues.value[index].competition_brand_name[0].competition_brand_id)
          if (test.length > 1) {
            this.toastr.error(this.util.languageTranslator(constant.scenario_name.warning_comp_data))
          }
        }
      }
    }
    this.brandDrop = this.brandDrop
  }
  /** configuraton service call */
  getConfigurationApiCall() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.configList = response.data;
    })
  }

  geoDrop: any = [];
  geoAll() {
    this.offerRecommenderService.getGeoList().subscribe((response: any) => {
      this.geoDrop = response.data;
    }, (error) => {
      this.toastr.error(error.error.data);
    });
  }

  /** restructure segment  service call */
  restructureSegmentList() {
    let segmentCopy: any = Object.assign(this.segmentDrop);
    var segmentListGroups = new Set(segmentCopy.map((item: { promo_id: any; }) => item.promo_id))
    segmentListGroups.forEach(g =>
      this.restructureSeg.set(g, segmentCopy.filter((i: { promo_id: any; }) => i.promo_id === g))
    )
  }

  /**onchange channel segment service call */
  getSegmentBasedOnChannel(event: any) {
    this.editForm.patchValue({
      discount_channel: [event],
    })
    this.segmentDrop = [];
    let segment: any[];
    let data: any
    if (event.promo_id == undefined) {
      data = event[0].promo_id
    } else {
      data = event.promo_id
    }
    segment = this.restructureSeg.get(data);
    for (let i = 0; i < segment.length; i++) {
      this.segmentDrop.push(segment[i])
    }
    this.segmentDrop.forEach((element: any, index: any) => {
      if (element.promo_id == constant.scenario_name.promoid) {
        let data = {
          promo_id: element.promo_id,
          segment_id: element.segment_id,
          segment_name: element.segment_name,
          disabled: true
        }
        this.editForm.patchValue({
          segment: [data]
        })
        this.promoMechDto();
      }
    });

  }

  /**Change Response */
  changeResponseBrand(data: any) {
    let brandChange: any = []
    data.forEach((element: any) => {
      let val: any
      if (element.competition_brand_id == constant.scenario_name.brandid) {
        let dataDis: any
        if (this.kfc_count >= constant.scenario_name.kfc) {
          dataDis = true
        } else {
          dataDis = false
        }
        val = {
          competition_brand_id: element.competition_brand_id, competition_brand_name: element.competition_brand_name,
          disabled: dataDis
        }

      } else {
        let dataDis: any
        if (this.bk_count >= constant.scenario_name.bk) {
          dataDis = true
        } else {
          dataDis = false
        }
        val = { competition_brand_id: element.competition_brand_id, competition_brand_name: element.competition_brand_name, disabled: dataDis }

      }
      brandChange.push(val)
    });
    this.brandDrop = brandChange
  }

  /**Validation for discount */
  validationDepth() {
    let val: any
    if (this.editForm.getRawValue().discount_price != '' && this.editForm.getRawValue().min_discount_price != '') {
      if (this.editForm.getRawValue().discount_price < this.editForm.getRawValue().min_discount_price || this.editForm.getRawValue().discount_price > this.editForm.getRawValue().max_discount_price) {
        val = 'error_discount_price'
      }
    }
    return val
  }

  /**Maintain session during change data */
  compDiscountSessionMaintain() {
    let comDiscountForm: any = this.scenarioForm.getRawValue().competition_discount;
    let comDisCount: any = []
    for (let i = 0; i < comDiscountForm.length; i++) {
      if (comDiscountForm[i].competition_brand_name.length > 0
        && comDiscountForm[i].discount.length > 0
        && !this.util.isNullOrEmptyOrUndefined(comDiscountForm[i].discount_depth)) {
        let compDisCountObj: any = {};
        compDisCountObj.competition_offer_id = comDiscountForm[i].discount[0].competition_offer_id;
        compDisCountObj.competition_offer_name = comDiscountForm[i].discount[0].competition_offer_name;
        compDisCountObj.competition_brand_id = comDiscountForm[i].competition_brand_name[0].competition_brand_id;
        compDisCountObj.competition_brand_name = comDiscountForm[i].competition_brand_name[0].competition_brand_name;
        compDisCountObj.discount_depth = comDiscountForm[i].discount_depth;
        comDisCount.push(compDisCountObj);
      }

    }
    this.segmentConfig.competition_promo = comDisCount;
    this.storeSegmentConfig();
  }

  /**Competition Brand open load data */
  brandOpen() {
    let myArray = this.getControlsComp()
    let kfc: any = myArray.filter((data: any) => data.value.competition_brand_name != '' && data.value.competition_brand_name[0].competition_brand_id == constant.scenario_name.brandid)
    this.kfc_count = kfc.length

    let bk: any = myArray.filter((data: any) => data.value.competition_brand_name != '' && data.value.competition_brand_name[0].competition_brand_id == constant.scenario_name.promoid)
    this.bk_count = bk.length

    this.changeResponseBrand(this.brandDrop)
  }

  stDate: any;
  /** update scenario interface */

  updateScenarioInterface(scenerio?: any) {
    // console.log("Scenario:", scenerio);

    this.segmentConfig = JSON.parse(sessionStorage.getItem(constant.scenario_name.segmentConfig) || '{}')

    if (Object.keys(this.segmentConfig).length == 0) {
      this.segmentConfig.offers = [];
      this.segmentConfig.competition_promo = [];
      if (!this.util.isNullOrEmptyOrUndefined(scenerio)) {
        if (!this.isEditFlow) {
          this.segmentConfig.scenario_name = "";
        } else {
          this.segmentConfig.scenario_name = this.scenarioNameSave;
        }

      }
    }
    if (!this.util.isNullOrEmptyOrUndefined(scenerio)) {
      this.reStructureSegment(scenerio);
    }
    this.storeSegmentConfig();
    this.patchFormDetails(this.segmentConfig)
    this.configureDataSource(this.segmentConfig.offers);
    this.configureDataSource(this.segmentConfig.offers, 'fixed');
  }

  /** Store Segment Configuration */
  storeSegmentConfig() {
    sessionStorage.setItem(constant.scenario_name.segmentConfig, JSON.stringify(this.segmentConfig));
  }

  /** Grid Restructure segment */
  reStructureSegment(segmentConfiguration: any) {
    for (let i = 0; i < segmentConfiguration.length; i++) {

      let segmentConfigurationList: any = {};
      segmentConfigurationList.start_date = segmentConfiguration[i].start_date;
      segmentConfigurationList.duration = segmentConfiguration[i].duration;
      segmentConfigurationList.coop = segmentConfiguration[i].coop;
      segmentConfigurationList.channel = segmentConfiguration[i].channel;
      segmentConfigurationList.promo_type = segmentConfiguration[i].promo_type;
      segmentConfigurationList.discount_mechanic = segmentConfiguration[i].dis_mech_desc;
      segmentConfigurationList.item_grp_desc = segmentConfiguration[i].item_grp_desc || segmentConfiguration[i].product_type;
      segmentConfigurationList.offer_desc = segmentConfiguration[i].offer_desc;
      segmentConfigurationList.base_price = segmentConfiguration[i].base_price;
      segmentConfigurationList.min_discount_price = segmentConfiguration[i].min_offer_price;
      segmentConfigurationList.max_discount_price = segmentConfiguration[i].max_offer_price;
      segmentConfigurationList.offer_price = segmentConfiguration[i].offer_price;
      segmentConfigurationList.discount_depth = segmentConfiguration[i].discount_depth;
      segmentConfigurationList.discount_depth_per = segmentConfiguration[i].discount_depth_per;
      segmentConfigurationList.offer_id = segmentConfiguration[i].offer_id;
      segmentConfigurationList.ohm_id = segmentConfiguration[i].ohm_id;
      segmentConfigurationList.dis_mech_id = segmentConfiguration[i].dis_mech_id;
      segmentConfigurationList.item_grp_id = segmentConfiguration[i].item_grp_id;
      segmentConfigurationList.impact_index = segmentConfiguration[i].impact_index;
      segmentConfigurationList.source = segmentConfiguration[i].source;
      segmentConfigurationList.actions = "no_change";
      segmentConfigurationList.scenario_offer_id = segmentConfiguration[i].scenario_offer_id || -1;
      this.segmentConfig.offers.push(segmentConfigurationList);
    }
    // console.log("this.segmentConfig.offers", this.segmentConfig.offers);

  }


  /** Restructure Segment */
  reStructureCompetitionDiscount(competitionDiscount: any) {
    for (let i = 0; i < competitionDiscount.length; i++) {
      let competitionDiscountList: any = {};
      competitionDiscountList.competition_brand_id = competitionDiscount[i].competition_brand_id;
      competitionDiscountList.competition_brand_name = competitionDiscount[i].competition_brand_name;
      competitionDiscountList.competition_offer_id = competitionDiscount[i].competition_offer_id;
      competitionDiscountList.competition_offer_name = competitionDiscount[i].competition_offer_name;
      competitionDiscountList.discount_depth = competitionDiscount[i].discount_depth;
      this.segmentConfig.competition_promo.push(competitionDiscountList);
    }

  }

  /** Configure Date Source for Material Table */
  configureDataSource(scenarioSegments: any, source: string = 'recommended') {
    let counter = 0;
    for (let i = 0; i < scenarioSegments.length; i++) {

      scenarioSegments[i].scenario_unique_id = counter;
      counter = counter + 1;


    }
    // console.log("Before Segment Config", scenarioSegments);

    if (source == 'fixed') {
      this.reStructureFixedPromosTable(scenarioSegments, true);
    }
    else
      this.reStructureScenarioTable(scenarioSegments);
  }

  /** Interface Connect */
  reStructureScenarioTable(scenarioSegments: any) {
    this.scenarioTable = [];
    let scenarioTableRestructPromos: any = [];
    for (let i = 0; i < scenarioSegments.length; i++) {
      if (scenarioSegments[i].source == 'recommended') {
        scenarioTableRestructPromos.push({
          "start_date": scenarioSegments[i].start_date,
          "duration": scenarioSegments[i].duration,
          "geo": scenarioSegments[i].coop,
          "discount_channel": scenarioSegments[i].channel,
          "promo_type": scenarioSegments[i].promo_type,
          "promomech_name": scenarioSegments[i].discount_mechanic,
          "product_type": scenarioSegments[i].item_grp_desc,
          "isDuplicate": scenarioSegments[i].isDuplicate ? true : false,
          "item_name": scenarioSegments[i].offer_desc,
          "discount_depth": scenarioSegments[i].discount_depth,
          "base_price": scenarioSegments[i].base_price,
          "min_discount_price": scenarioSegments[i].min_discount_price,
          "max_discount_price": scenarioSegments[i].max_discount_price,
          "promo_price": scenarioSegments[i].offer_price,
          "scenario_unique_id": scenarioSegments[i].scenario_unique_id,
          "offer_id": scenarioSegments[i].offer_id,
        });
      }
    }

    this.scenarioTable = Object.assign([], scenarioTableRestructPromos);
    this.dataSourceScenario = new MatTableDataSource(this.scenarioTable);
    this.dataSourceScenario.paginator = this.tableTwoPaginator;
    this.dataSourceScenario.sort = this.sort2;
    this.dataCopy = this.scenarioTable;
    this.restructSegmentConfigUK();

  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.dataSourceScenario.filter = this.searchString.trim().toLowerCase();
    if (!this.util.isNullOrEmptyOrUndefined(this.dataSourceScenario.paginator)) {
      this.dataSourceScenario.paginator.firstPage();
    }
  }



  /** Scenario Filter */
  applyFilterScenario(filterValue: any) {
    if (!this.util.isNullOrEmptyOrUndefined(filterValue.target.value)) {
      let filterValues: string = filterValue.target.value;
      this.dataSourceScenario.filter = filterValues.trim().toLowerCase();
      if (this.dataSourceScenario.paginator) {
        this.dataSourceScenario.paginator.firstPage();
      }
    } else {
      let filterValues: string = filterValue.target.value;
      this.dataSourceScenario.filter = filterValues;
    }
  }

  /** Validate Item List */
  validateItem(items: any) {
    if (items.length > 0) {
      return items[0].item_name;
    }
    return items;
  }

  /** Validate Item List */
  validateItemCode(items: any) {
    if (items.length > 0) {
      return items[0].item_code;
    }
    return items;
  }

  /** Restructure Item List */
  restructSegmentConfigUK() {
    let segmentConfig: any = this.segmentConfig.offers;
    var segmentGroup = new Set(segmentConfig.map((seg: { scenario_unique_id: any; }) => seg.scenario_unique_id))

    segmentGroup.forEach(g =>
      this.mapSegmentConfigByUK.set(g, segmentConfig.filter((i: { scenario_unique_id: any; }) => i.scenario_unique_id === g))
    )
  }

  onChangeSegment(event: any) {
    this.promoID = [event];
    this.editForm.patchValue({
      geo: [{ ohm_id: event.ohm_id, coop_name: event.coop_name }],
      ohm_id: event.ohm_id,                             //CHECK
    })

    if (event.coop_name == 'National') {
      this.promoTypeList = [constant.scenario_name.promoTypeListDropdown[0]];
    }
    else {
      this.promoTypeList = constant.scenario_name.promoTypeListDropdown
    }
    this.resetPromoType();
  }

  onChangePromoTypeSelect(event: any) {
    this.editForm.patchValue({
      promo_type: [{ promoTypeID: event.promoTypeID, promoTypeDesc: event.promoTypeDesc }],
    })
    this.resetDiscountMech();
    this.promoMechDto();
  }

  onChangeMechanicSelect(event: any) {
    this.editForm.patchValue({
      discount_mechanic: [{ dis_mech_id: event.dis_mech_id, dis_mech_desc: event.dis_mech_desc }],
      dis_mech_id: event.dis_mech_id,
    })
    this.resetProductType(event);
    this.productTypeDto();
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

  addFixedPromos: boolean = false;
  editScenarioPopup(source: string) {
    this.addFixedPromos = (source == 'fixed') ? true : false;
    this.editButton = true;
    this.editForm.reset()
    this.showItemModel(this.editModal);
  }

  addScenarioPopup(source: string) {
    this.addFixedPromos = (source == 'fixed') ? true : false;
    this.editForm.reset()

    console.log("before", this.editForm);

    this.editForm.patchValue({
      discount_channel: [{
        promo_id: constant.scenario_name.promoChannelDropdown[0].promo_id,
        promo_name: constant.scenario_name.promoChannelDropdown[0].promo_name
      }],
    })

    console.log("After", this.editForm);

    this.editButton = false
    this.showItemModel(this.editModal);
    this.clearError()
  }

  editRow(scenario_unique_id: number) {
    this.editForm.patchValue(this.patchEditValue(scenario_unique_id))
    this.promoMechDto();
    this.productTypeDto();
    this.getItemDto();
    this.dateErrorMessage()
    // this.onDurationClick();
  }

  getPromoChannelList(promo_id: any) {
    for (let i = 0; i < this.promoChannelList.length; i++) {
      if (this.promoChannelList[i].promo_id == promo_id) {
        return this.promoChannelList[i];
      }
    }
  }

  patchEditValue(scenario_unique_id: number) {
    this.scenarioUniqueId = scenario_unique_id;
    let selScenarioConfig: any = this.mapSegmentConfigByUK.get(scenario_unique_id)[0];
    let editFormTemplate = {
      start_date: selScenarioConfig.start_date,
      duration: [{ id: 1, weeks: selScenarioConfig.duration }],
      geo: [{ ohm_id: selScenarioConfig.ohm_id, coop_name: selScenarioConfig.coop }],
      discount_channel: [{ promo_id: 10, promo_name: selScenarioConfig.channel }],
      promo_type: [{ promoTypeID: 11, promoTypeDesc: selScenarioConfig.promo_type }],
      discount_mechanic: [{ dis_mech_id: selScenarioConfig.dis_mech_id, dis_mech_desc: selScenarioConfig.discount_mechanic }],
      product_type: [{ promo_type_id: 12, promo_type_name: selScenarioConfig.item_grp_desc }],
      items: [{ item_id: 13, item_name: selScenarioConfig.offer_desc }],
      base_price: selScenarioConfig.base_price,
      min_discount_price: selScenarioConfig.min_discount_price,
      max_discount_price: selScenarioConfig.max_discount_price,
      discount_price: parseFloat(selScenarioConfig.offer_price.toFixed(2)),
      discount_depth: parseInt((+selScenarioConfig.discount_depth).toFixed(0)),
      offer_id: selScenarioConfig.offer_id,
      ohm_id: selScenarioConfig.ohm_id,
      dis_mech_id: selScenarioConfig.dis_mech_id,
      item_grp_id: selScenarioConfig.item_grp_id,
      scenario_offer_id: selScenarioConfig.scenario_offer_id,

    }

    return editFormTemplate;
  }

  /** Close model and clear the data */
  dismissData() {
    this.editButton = false;
    this.clickPopup = false;
    this.scenarioUniqueId = undefined;
    this.modalService.dismissAll();
    this.clearError()
  }

  /** update the added segment config */
  updateAddSegment(source: string = "recommended") {
    if (this.addFixedPromos == true)
      source = 'fixed';
    let addSegmentConfig: segData = {} as segData;
    addSegmentConfig.start_date = this.datepipe.transform(this.editForm.getRawValue().start_date, constant.scenario_planner.StartDateTime) || '';
    addSegmentConfig.duration = this.editForm.getRawValue().duration[0].weeks;
    addSegmentConfig.coop = this.editForm.getRawValue().geo[0].coop_name;
    addSegmentConfig.channel = this.editForm.getRawValue().discount_channel[0].promo_name;
    addSegmentConfig.promo_type = this.editForm.getRawValue().promo_type[0].promoTypeDesc;
    addSegmentConfig.discount_mechanic = this.editForm.getRawValue().discount_mechanic[0].dis_mech_desc;
    addSegmentConfig.item_grp_desc = this.editForm.getRawValue().product_type[0].promo_type_name;
    addSegmentConfig.offer_desc = this.editForm.getRawValue().items[0].item_name;
    addSegmentConfig.base_price = this.editForm.getRawValue().base_price;
    addSegmentConfig.min_discount_price = this.editForm.getRawValue().min_discount_price;
    addSegmentConfig.max_discount_price = this.editForm.getRawValue().max_discount_price;
    addSegmentConfig.offer_price = Number(this.editForm.getRawValue().discount_price);
    addSegmentConfig.discount_depth = this.editForm.getRawValue().discount_depth;
    addSegmentConfig.offer_id = this.editForm.getRawValue().offer_id;
    addSegmentConfig.ohm_id = this.editForm.getRawValue().geo[0].ohm_id;
    addSegmentConfig.dis_mech_id = this.editForm.getRawValue().discount_mechanic[0].dis_mech_id;
    addSegmentConfig.item_grp_id = this.editForm.getRawValue().item_grp_id;
    addSegmentConfig.source = source;
    addSegmentConfig.scenario_unique_id = this.segmentConfig.offers.length;
    addSegmentConfig.scenario_offer_id = this.editForm.getRawValue().scenario_offer_id || -1;
    if (!this.editButton) {
      this.clearSearch();
      addSegmentConfig.actions = "added";
      this.segmentConfig.offers.push(addSegmentConfig);

    } else {
      addSegmentConfig.actions = "edited";
      this.segmentConfig.offers[this.scenarioUniqueId] = addSegmentConfig;
    }

    this.storeSegmentConfig();


    this.configureDataSource(this.segmentConfig.offers, source);
    if (source == 'fixed')
      // console.log("After clicking on save", this.segmentConfig.offers);
      this.configureDataSource(this.segmentConfig.offers, 'recommended');
    if (source == 'recommended')
      this.configureDataSource(this.segmentConfig.offers, 'fixed');
    this.dismissData();
    this.isReadOnly = false;
    this.clearError();
    this.proceedToSave = false;
    this.promosEdited = true;
    this.saveandsubmit = false;
  }

  /** Reset to default grid criteria */
  clearSearch() {
    this.searchString = "";
    this.dataSourceScenario.filter = this.searchString.trim().toLowerCase();
    this.dataSourceScenario.sort = this.sort;
    const sortState: Sort = { active: 'scenario_unique_id', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState)
  }



  resetField() {
    this.editForm.patchValue({
      discount_channel: [],
      segment: [],
      discount_mechanic: [],
      product_type: [],
      discount_depth: '',
      base_price: '',
      min_discount_price: '',
      max_discount_price: '',
      discount_price: '',
      items: []
    });

    this.promoMechChannelList = [];
    this.promoDropData = [];
    this.itemDropData = [];
    this.clearError()
  }


  removeSessionStorage() {
    sessionStorage.removeItem(constant.scenario_name.offer_config_id)
    sessionStorage.removeItem(constant.scenario_name.scenario_form)
    sessionStorage.removeItem(constant.scenario_name.disablelist)
  }

  /** Create Discount */

  updateCreateScenarioConfig() {
    this.segmentConfig.scenario_name = !this.util.isNullOrEmptyOrUndefined(this.scenarioForm.getRawValue().scenario_name) ? this.scenarioForm.getRawValue().scenario_name : '';
    this.storeSegmentConfig();
    this.dateErrorMessage()
  }

  /*************** Validation  ***********/

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
    this.editForm.patchValue({ discount_price: parseFloat(discountPrice.toFixed(2)) })
    return parseFloat(discountPrice.toFixed(2));

  }


  calculatePriceEdit(regprice: any, discountdepth: any) {
    const discountPrice = regprice - ((discountdepth / 100) * regprice)
    return discountPrice
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
    this.editForm.patchValue({ discount_depth: parseInt(discountDepth.toFixed(0)) })
  }


  /**competition depth change */
  changeCompDiscountDepth(event: any) {
    if (event.target.value != '') {
      if (JSON.parse(this.configList.competition_min_depth) <= JSON.parse(event.target.value) && JSON.parse(event.target.value) <= JSON.parse(this.configList.competition_max_depth)) {
        this.errorTextComp = ''
      } else {
        this.errorTextComp = this.util.languageTranslator(constant.scenario_name.depth_val) + this.configList.competition_min_depth + '%' + this.util.languageTranslator(constant.scenario_name.depth_val_last) + this.configList.competition_max_depth + '%'
      }
    }
    this.compDiscountSessionMaintain()
  }

  warningMessage(min_discount: any, max_discount: any, discount_price: any, regular_price: any) {

    this.errorTextPrice = ""
    if (parseFloat(discount_price) < min_discount) {
      this.errorTextPrice = this.util.languageTranslator(constant.scenario_name.warning_min)
      this.isDisable = true;

    } else if (parseFloat(discount_price) > max_discount && parseFloat(discount_price) <= regular_price) {
      this.errorTextPrice = this.util.languageTranslator(constant.scenario_name.warning_high)
      this.isDisable = true;
    } else if (parseFloat(discount_price) > regular_price) {
      this.errorTextPrice = this.util.languageTranslator(constant.scenario_name.warning_reg_high)
      this.isDisable = true;
    }
    else {
      this.errorTextPrice = ""
      this.isDisable = false;
      this.dateErrorMessage(min_discount, max_discount, discount_price, regular_price);

    }
    this.validationDepth();
  }

  addWeeks(numOfWeeks: any, date: Date) {
    this.endDate = new Date(date.setDate(date.getDate() + numOfWeeks * 7));
    return this.endDate;
  }

  dateErrorMessage(min_discount?: any, max_discount?: any, discount_price?: any, regular_price?: any) {

    let previousDate = new Date(this.editForm.getRawValue().start_date);
    let temp = new Date(this.editForm.getRawValue().start_date);
    let currentDate = new Date();
    let nextDate = new Date(this.editForm.getRawValue().start_date)
    let totalDuration = this.editForm.getRawValue().duration[0].weeks;
    // let validDate = new Date(previousDate.getTime() + 7 * 24 * 60 * 60 * 1000 )

    this.addWeeks(totalDuration, temp)

    // For Fixed Promos
    if (this.scenarioFlag == 'CREATE_PROMOS' && this.editButton == true && this.addFixedPromos == true) {
      if (this.endDate.getTime() < currentDate.getTime() && this.scenarioFlag == 'CREATE_PROMOS') {
        this.isDisable = true;
        this.errorTextPrice = this.util.languageTranslator(constant.scenario_name.warning_invalid_date_and_duration)
      } else {
        this.isDisable = false;
        this.errorTextPrice = "";


      }
    } else {
      if (this.endDate.getTime() < currentDate.getTime() && this.scenarioFlag == 'IMPORT_RECOMMENDER') {
        this.errorTextPrice = this.util.languageTranslator(constant.scenario_name.warning_invalid_date)
      }
    }

    // For Recommended Promos

    if (this.scenarioFlag == 'IMPORT_RECOMMENDER' && this.editButton == true && this.addFixedPromos == false) {
      if (previousDate.getTime() < currentDate.getTime() &&
        !isNaN(previousDate.getTime().valueOf()) &&
        !isNaN(currentDate.getTime().valueOf())) {
        this.errorTextPrice = this.util.languageTranslator(constant.scenario_name.warning_invalid_date)

      }
    }

    if (currentDate.getTime() <= nextDate.getTime()
      && !(parseFloat(discount_price) < min_discount)
      && !(parseFloat(discount_price) > max_discount && parseFloat(discount_price) <= regular_price)
      && !(parseFloat(discount_price) > regular_price)) {
      this.errorTextPrice = ""
    }
  }
  /**Disabled Drop Down */

  disableDropdown() {
    this.discountChannelSettings = {
      primaryKey: "promo_id",
      labelKey: "promo_name",
      singleSelection: true,
      text: "",
      enableSearchFilter: true,
      classes: "myclass channel-disable-class",
      showCheckbox: false,
      disabled: false
    };
    this.weekDropdownSettings = {
      primaryKey: "offer_duration_id",
      labelKey: "description",
      singleSelection: true,
      text: "",
      enableSearchFilter: false,
      classes: "myclass dropdown-duration",
      showCheckbox: false,
      disabled: true
    };
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


  /** Navigation */


  /**Homepage redirect */
  homePage() {
    if (this.editAvailable) {
      this.router.navigate([constant.NAVIGATION.IMPORT_RECOMMENDER]);
    } else {
      this.router.navigate([constant.NAVIGATION.SCENARIO_LANDING]);
    }
    sessionStorage.removeItem(constant.scenario_name.segmentConfig);
    sessionStorage.removeItem("FixedPromos");
    sessionStorage.removeItem(constant.scenario_name.current_offer_config_id);
    sessionStorage.removeItem(constant.scenario_name.offer_config_id);
  }


  /**Back to import */
  backImport() {
    this.storeCurrentOfferId();
    this.compDiscountSessionMaintain()
    this.router.navigate([constant.NAVIGATION.IMPORT_RECOMMENDER]);
  }

  storeCurrentOfferId() {
    sessionStorage.setItem(constant.scenario_name.current_offer_config_id, this.urlSecurityService.decryptUsingAES256(this.activeRouter.snapshot.params[constant.login_page.offerId]));
  }

  /**Redirect Scenario result */
  scenaioResult(data: any) {
    this.packageSummaryService.setScenarioId(data);
    this.router.navigate([constant.NAVIGATION.SCENARIO_RESULTS, this.urlSecurityService.encryptUsingAES256(data)]);
  }
  /**Duration Data bind */
  durationEdit(data: any) {
    let val = ''
    for (let i = 0; i < this.weekList.length; i++) {
      if (this.weekList[i].offer_duration_id == data) {
        val = this.weekList[i].description;
        break;
      }
    }
    return val
  }
  /** find segment and item duplicate */
  findItemDuplicate() {
    for (let i = 0; i < this.scenarioTable.length; i++) {
      for (let j = i + 1; j < this.scenarioTable.length; j++) {
        if (this.scenarioTable[j].segment_id == this.scenarioTable[i].segment_id &&
          this.validateItemDuplicate(this.scenarioTable[i].item_code, this.scenarioTable[j].item_code)) {
          this.scenarioTable[i].isDuplicate = true
          this.scenarioTable[j].isDuplicate = true
        }

        if (!(this.scenarioTable[j].segment_id == constant.scenario_name.offline_segment_id
          || this.scenarioTable[i].segment_id == constant.scenario_name.offline_segment_id)) {
          if (this.scenarioTable[j].segment_id == constant.OFFER_CONFIGURATION.PROMO_CHANNEL_MASS_ONLINE ||
            this.scenarioTable[i].segment_id == constant.OFFER_CONFIGURATION.PROMO_CHANNEL_MASS_ONLINE) {
            if (this.validateItemDuplicate(this.scenarioTable[i].item_code, this.scenarioTable[j].item_code)) {
              this.scenarioTable[i].isDuplicate = true
              this.scenarioTable[j].isDuplicate = true
            }
          }
        }
      }
    }
  }

  /** Validate Item Duplicate */
  validateItemDuplicate(itemCodeI: any, itemCodeJ: any) {
    let isDuplicate: boolean = false;
    let itemArrayI = itemCodeI.split("-");
    let itemArrayJ = itemCodeJ.split("-");

    for (let i = 0; i < itemArrayI.length; i++) {
      for (let j = 0; j < itemArrayJ.length; j++) {
        if (itemArrayI[i] == itemArrayJ[j]) {
          isDuplicate = true;
          break;
        }
      }
    }
    return isDuplicate;
  }

  /** validate Load price based on discount mechanic in create mode */
  loadPrice(data: any) {
    if (this.editForm.getRawValue().discount_mechanic[0].promomech_code == constant.scenario_name.priceof1) {
      this.isReadOnly = true
      this.editForm.get(constant.scenario_name.disdepth)?.setValidators([])
      this.editForm.get(constant.scenario_name.discountprice)?.setValidators([])
      this.editForm.patchValue({
        discount_depth: constant.scenario_name.default_discount_depth,
        base_price: data.base_price,
        min_discount_price: '',
        max_discount_price: '',
        discount_price: data.base_price
      })
    }
    else if (this.editForm.getRawValue().discount_mechanic[0].promomech_code.substring(0, 4) == constant.scenario_name.checkThreshold) {
      this.isReadOnly = true
      this.editForm.get(constant.scenario_name.disdepth)?.setValidators([])
      this.editForm.get(constant.scenario_name.discountprice)?.setValidators([])
      this.editForm.patchValue({
        discount_depth: '',
        base_price: data.base_price,
        min_discount_price: '',
        max_discount_price: '',
        discount_price: ''
      })
    }
    else {
      this.isReadOnly = false
      this.editForm.get(constant.scenario_name.disdepth)
      this.editForm.get(constant.scenario_name.discountprice)?.setValidators([Validators.required, Validators.min(data.min_offer_price), Validators.max(data.base_price)])
      this.editForm.patchValue({
        base_price: data.base_price,
        min_discount_price: data.min_offer_price,
        max_discount_price: data.max_offer_price,

      })
    }

  }

  /** validate Load price based on discount mechanic in Edit mode */
  loadEditPrice(data: any) {
    if (this.editForm.getRawValue().discount_mechanic[0].promomech_code == constant.scenario_name.priceof1) {
      this.isReadOnly = true
      this.editForm.get(constant.scenario_name.disdepth)?.setValidators([])
      this.editForm.get(constant.scenario_name.discountprice)?.setValidators([])
      this.editForm.patchValue({
        discount_depth: constant.scenario_name.default_discount_depth,
        base_price: this.editForm.getRawValue().base_price,
        min_discount_price: this.editForm.getRawValue().min_discount_price,
        max_discount_price: this.editForm.getRawValue().max_discount_price,
        discount_price: this.editForm.getRawValue().base_price
      })
    }
    else if (this.editForm.getRawValue().discount_mechanic[0].promomech_code.substring(0, 4) == constant.scenario_name.checkThreshold) {
      this.isReadOnly = true
      this.editForm.get(constant.scenario_name.disdepth)?.setValidators([])
      this.editForm.get(constant.scenario_name.discountprice)?.setValidators([])
      this.editForm.patchValue({
        discount_depth: '',
        base_price: this.editForm.getRawValue().base_price,
        min_discount_price: '',
        max_discount_price: '',
        discount_price: ''
      })
    }
    else {
      this.isReadOnly = false
      this.editForm.get(constant.scenario_name.disdepth)
      this.editForm.get(constant.scenario_name.discountprice)?.setValidators([Validators.required, Validators.min(data.min_discount_price), Validators.max(data.base_price)])
      this.editForm.patchValue({
        base_price: this.editForm.getRawValue().base_price,
        min_discount_price: this.editForm.getRawValue().min_discount_price,
        max_discount_price: this.editForm.getRawValue().max_discount_price,

      })
    }
  }

  depthValid(row: any) {
    let data = 'valid-cell'
    if (!(row.promomech_code != constant.scenario_name.priceof1
      || row.promomech_code.substring(0, 4) == constant.scenario_name.checkThreshold)) {
      if (row.discount_depth != '')
        if (this.configList.discount_depth_min > row.discount_depth
          || this.configList.discount_depth_max < row.discount_depth) {
          data = 'error-cell'
        }
    }
    return data
  }

  priceValid(row: any) {
    let data = 'valid-cell'
    if (!(row.promomech_code != constant.scenario_name.priceof1
      || row.promomech_code.substring(0, 4) == constant.scenario_name.checkThreshold)) {
      if (row.discount_depth != '')
        if (row.promo_price < row.min_discount_price) {
          data = 'error-cell'
        }
    }
    return data
  }
  clearError() {
    this.errorText = '',
      this.errorTextPrice = ''
    this.editForm.controls.discount_depth.reset("");
    this.editForm.controls.discount_price.reset("");
  }

  validateFlowTypeByParams(type?: string) {
    if (!this.util.isNullOrEmptyOrUndefined(type)) {
      if (type == constant.scenario_name.scenario_edit) {
        this.isCopyFlow = false;
        this.isEditFlow = true;
      } else if (type == constant.scenario_name.scenario_copy) {
        this.isCopyFlow = true;
        this.isEditFlow = false;
      }
      sessionStorage.setItem(constant.scenario_name.scenario_type, JSON.stringify(type));
    } else {
      this.isCopyFlow = false;
      this.isEditFlow = false;
    }
  }

  /** form validation */
  get scenarioFormControl() {
    return this.scenarioForm.controls;
  }

  dataSourceScenarioFixedPromos: any;
  scenarioTableFixedPromos: FixedPromosDataTable[] = [];
  scenarioTableRestruct!: FixedPromosDataTable[];



  reStructureFixedPromosTable(scenarioSegments: any, addFixedPromos: boolean = false) {
    let datafetch: any = JSON.parse(sessionStorage.getItem('FixedPromos') || '[]')
    // console.log("DataFetch Data:", datafetch);

    // console.log("Before Scenario Table", this.scenarioTableRestruct);
    if (datafetch.length == 0 || addFixedPromos == true)
      this.scenarioTableRestruct = [];
    else
      this.scenarioTableRestruct = datafetch;

    // console.log("Processing Scenario Table", this.scenarioTableRestruct.length, this.scenarioTableRestruct);

    for (let i = 0; i < scenarioSegments.length; i++) {

      if (scenarioSegments[i].source == 'fixed') {
        let previousDate = new Date(scenarioSegments[i].start_date);
        let currentDate = new Date()

        if (this.scenarioFlag == 'IMPORT_RECOMMENDER' && this.editButton == false && this.addFixedPromos == false && previousDate.getTime() < currentDate.getTime()) {
          this.errorTextActivePromos = this.util.languageTranslator(constant.scenario_name.warning_invalid_date_active_promos)
        }

        this.scenarioTableRestruct.push({
          "start_date": scenarioSegments[i].start_date,
          "duration": scenarioSegments[i].duration,
          "geo": scenarioSegments[i].coop,
          "discount_channel": scenarioSegments[i].channel,
          "promomech_name": scenarioSegments[i].discount_mechanic,
          "item_name": scenarioSegments[i].offer_desc,
          "promo_price": scenarioSegments[i].offer_price,
          "isDuplicate": scenarioSegments[i].isDuplicate,
          "discount_depth": scenarioSegments[i].discount_depth,
          "discount_depth_per": scenarioSegments[i].discount_depth_per,
          "scenario_unique_id": scenarioSegments[i].scenario_unique_id,
          "offer_id": scenarioSegments[i].offer_id,
          "promo_type": scenarioSegments[i].promo_type,
          "product_type": scenarioSegments[i].item_grp_desc,
          "regular_price": scenarioSegments[i].base_price,
          "min_discount_price": scenarioSegments[i].min_discount_price
        });
      }

    }
    // console.log("After Scenario Table", this.scenarioTableRestruct);
    // console.log("Before 123", this.scenarioTableFixedPromos);

    this.scenarioTableFixedPromos = Object.assign([], this.scenarioTableRestruct);
    // console.log("After 123", this.scenarioTableFixedPromos);

    this.dataSourceScenarioFixedPromos = new MatTableDataSource(this.scenarioTableFixedPromos);
    this.dataSourceScenarioFixedPromos.paginator = this.tableOnePaginator;
    this.dataSourceScenarioFixedPromos.sort = this.sort;
    sessionStorage.setItem("FixedPromos", JSON.stringify(this.scenarioTableRestruct))
    this.restructSegmentConfigUK();

  }

  getActivePromoData() {

    let modifiedResp: any = [];

    this.offerRecommenderService.getFixedPromos().subscribe((res: any) => {
      modifiedResp = res.data.fixed_promos;
      // console.log("Resp:", modifiedResp);
      this.updateScenarioInterface(modifiedResp)
    }, (error) => {

    });
  }

}
