import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import * as constant from './../../shared/constant/constant';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from '../../services/constant.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ScenarioDiscountServiceService } from 'src/app/services/scenario-discount-service.service';
import { ScenarioComparisionService } from 'src/app/services/scenario-comparision.service';
import { OfferRecommenderService } from '../../services/offer-recommender.service';
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from 'src/app/services/util.service';
import { MatSort, Sort } from '@angular/material/sort';
import { UrlSecurityService } from "src/app/services/url-security.service";
import { Title } from '@angular/platform-browser';
import { PackageSummaryService } from 'src/app/services/package-summary.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewUserService } from 'src/app/services/review-user.service';

@Component({
  selector: 'app-scenario-selection',
  templateUrl: './scenario-selection.component.html',
  styleUrls: ['./scenario-selection.component.scss']
})
export class ScenarioSelectionComponent implements OnInit {

  /**Language Translation */
  selectedLanguage: any;

  minDate = new Date();
  maxDate = new Date();
  st_Date: any;
  en_Date: any;
  start_Date: any;
  end_Date: any;
  stDate: any;
  maxStartDate = new Date();
  minStartDate = new Date();
  startDate: any;
  endDate: any;
  scenarioSearch: any;

  /**Table variables  */
  displayedColumns: string[] = constant.scenario_planner.scenarioSelection;
  displayedColumnsD: string[] = constant.scenario_planner.scenarioSelectionD;
  geosDisplayColumns: string[] = constant.offer_package_summary.coopsDisplayColumns;
  geodropdownSettings: any = constant.preview_page.geoDropdown;
  promodropdownSettings: any = constant.preview_page.promoDropdown;
  displayedColumnsSub: string[] = constant.scenario_planner.scenarioSelectionSubCoulmns

  selection = new SelectionModel<any>(true, []);
  dataSource!: MatTableDataSource<any>;
  expDataSource!: MatTableDataSource<any>;
  scenarioSelectData: any;
  count: any;

  panelOpenState = true;
  OpenState = [false, false, false, false, false];

  /** Pagination */
  pageIndex = constant.preview_page.zero;
  limit: number = constant.preview_page.five;
  scenarioID: any;
  startdate: any = [];
  comparebtn: boolean = true;
  scenID: any = [];
  scenName: any = [];
  selectAllData: any = [];
  startdt: any = [];
  geoData: any = [];
  promoChannelData: any = [];
  geoId_name: any = [];
  closeResult: any;
  actions_list = ['edit', 'copy', 'delete'];
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  sorting = {
    sort: constant.offer_package_summary.desc, order_by: ""
  }
  scenarioName: any;
  filterdate: any;
  geo_name: any;
  promo_type: any;
  segmentList: any = [];
  segmentLength: any = [];
  segmentName: any = [];
  segName: any = [];
  overAlldata: any = [];
  zeroData: any = [];
  configList: any;
  minYear: Date | undefined;
  maxYear = new Date();
  duration: any = [];
  //setCurrency
  currencyCode: any
  discDuration: any = [];

  discountDurationList: any;
  discountDurationValue: any = [];

  deleteConfigId: any;
  isCopyButton: boolean = false;
  isEditButton: boolean = false;
  contentShow: any
  geo: any = [];
  promoType: any;
  emptyshow: boolean = false;
  selectAllstatus: any;

  selectAllpromo: any;
  promoId_name: any = [];

  // Read And Write Variables

  show_edit_copy_menu_option: boolean = false;


  constructor(private router: Router,
    public translate: TranslateService,
    public constantService: ConstantService,
    private datepipe: DatePipe,
    private scenarioDisountService: ScenarioDiscountServiceService,
    private scenarioComparisionService: ScenarioComparisionService,
    public offerRecommenderService: OfferRecommenderService,
    private toastr: ToastrService,
    private utils: UtilService,
    private urlSecurityService: UrlSecurityService,
    public packageSummaryService: PackageSummaryService,
    private modalService: NgbModal,
    private titleService: Title,
    public readAndWriteService: ReviewUserService) { }
  value_order = "asc";
  sort_value = "scenario_id";

  sort_checked = false;

  ngOnInit(): void {
    this.initialAPICall()
    this.initialLanguageCall();
    this.configMaster();
    this.checkUserAccess();
    this.expDataSource.sort = this.sort;
    const sortState: Sort = { active: 'coop', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }


  /**Initial API Call */
  initialAPICall() {
    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)
    this.titleService.setTitle(constant.login_page.scenario_compare);
    sessionStorage.removeItem(constant.login_page.scenario_id);
    this.minDate.setDate(this.minDate.getDate() - constant.scenario_planner.start_date_val);
    sessionStorage.removeItem(constant.scenario_name.offer_config_id)
    sessionStorage.removeItem(constant.scenario_name.scenario_form)
    sessionStorage.removeItem('segment_scenario_form')
    sessionStorage.removeItem(constant.scenario_name.segmentConfig);
    sessionStorage.removeItem("FixedPromos");
    this.maxStartDate.setDate(this.maxDate.getDate() + constant.scenario_planner.start_date_val)
    this.minStartDate.setDate(this.minStartDate.getDate() - constant.scenario_planner.start_date_val)
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.start_Date = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.end_Date = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.scenarioSelectionApiCall();
    this.readAndWritePermission();
  }

  /** User Access */
  checkUserAccess() {
    this.isEditButton = this.utils.userAccess(constant.userAccess.sc_edit_btn);
    this.isCopyButton = this.utils.userAccess(constant.userAccess.sc_copy_btn);
  }

  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      // if (response.status == "success") {
      this.configList = response.data;
      this.minStartDate = this.utils.startDateCalulationMin(this.configList.default_min_start_date);
      this.maxStartDate = this.utils.startDateCalulationMax(this.configList.default_min_start_date, this.configList.default_max_start_date);
      this.minYear = this.utils.createDateCalulationMin(this.configList.created_at_date);
      // this.maxYear = this.utils.createDateCalulationMax(this.configList.created_at_date);
      // }
    }, (error) => { })
  }

  /** Get Start Date */
  startdateRangeChange(event: any) {
    var start_date = event.value;
    this.startDate = this.datepipe.transform(start_date, constant.preview_page.dateFormat);
    this.pageIndex = constant.preview_page.zero;

  }

  /** Get End Date */
  enddateRangeChange(event: any) {
    var end_date = event.value;
    this.endDate = this.datepipe.transform(end_date, constant.preview_page.dateFormat);
    this.pageIndex = constant.preview_page.zero;
    this.dateFilterApiCall();
  }

  /** Discount Duration Change */
  durationChange(duration: any) {
    let durat = [];
    durat.push(duration);
    this.discountDurationValue = durat;
  }

  /** Initial Payload */
  payload() {
    var payload = {
      scenario_id: this.scenarioID ? this.scenarioID : "",
      scenario_name: this.scenarioName ? this.scenarioName : "",
      start_date: this.stDate ? this.stDate : "",
      geo: this.geoId_name ? this.geoId_name : "",
      promo_type: this.promoId_name ? this.promoId_name : "",
      order_value: this.value_order,
      sort_column: this.sort_value
    }
    return payload;
  }

  /** Filter Payload */
  dateFilterPayload() {
    var payload = {
      scenario_id: this.scenarioID ? this.scenarioID : "",
      scenario_name: this.scenarioName ? this.scenarioName : "",
      start_date: this.stDate ? this.stDate : "",
      geo: this.geoId_name ? this.geoId_name : "",
      promo_type: this.promoId_name ? this.promoId_name : ""
    }
    return payload;
  }

  /** Filter Payload */
  filterPayload() {
    var payload = {
      scenario_id: this.scenarioID ? this.scenarioID : "",
      scenario_name: this.scenarioName ? this.scenarioName : "",
      start_date: this.stDate ? this.stDate : "",
      geo: this.geoId_name.length > 0 ? this.geoId_name : "",
      promo_type: this.promoId_name.length > 0 ? this.promoId_name : "",
      order_value: this.value_order,
      sort_column: this.sort_value
    }
    // console.log(this.scenarioID);
    // console.log(this.scenarioName);
    // console.log(this.stDate);
    // console.log(this.geo);
    // console.log(this.promoType);
    return payload;
  }

  /** Filter DTO */
  filterDTO() {
    this.pageIndex = constant.preview_page.zero;
    this.filter();
  }

  /** Scenario Filter */
  filter() {
    this.scenarioComparisionService.getScenarioslist(this.filterPayload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.scenarioSelectData = response.data.list_of_scenario;
        this.count = response.data.total_count;
        this.dataSource = new MatTableDataSource(this.scenarioSelectData);
        this.dataSource.sort = this.sort;
        this.OpenState = []
        for (let i = 0; i < this.scenarioSelectData.length; i++) {
          this.OpenState.push(false);
        }
        this.selectCheck();
      }
    }, (error) => {

    })
  }
  innersort(event: any) {
    let x = this.expDataSource.filteredData;
    if (event.direction == 'asc') {
      x = x.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[event.active] > b[event.active] ? 1 : a[event.active] < b[event.active] ? -1 : 0);
    }
    else {
      x = x.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[event.active] < b[event.active] ? 1 : a[event.active] > b[event.active] ? -1 : 0);
    }
    this.expDataSource = new MatTableDataSource(x);
    // console.log("assigned",this.expDataSource);
  }



  /**Secanrio Selection API Call */
  scenarioSelectionApiCall() {
    let filterDropdownData;
    // console.log(this.payload());

    this.scenarioComparisionService.getScenarioslist(this.payload(), this.pageIndex + constant.preview_page.one, this.limit,).subscribe((response: any) => {
      // let res = constant.scenarioSelectionPage
      let res = response;
      if (res.http_code == constant.login_page.reponseCode) {
        this.scenarioSelectData = res.data.list_of_scenario;
        this.count = res.data.total_count;
        this.dataSource = new MatTableDataSource(this.scenarioSelectData);
        this.dataSource.sort = this.sort;
        this.OpenState = []
        for (let i = 0; i < this.scenarioSelectData.length; i++) {
          this.OpenState.push(false);
        }
        this.selectCheck();
        filterDropdownData = response.data.filter_data;
        this.geoData = filterDropdownData.geo.map((val: any, index: number) => ({ id: index, geo_name: val }));
        this.promoChannelData = filterDropdownData.promo_type.map((val: any, index: number) => ({ promo_id: index, promo_types: val }));

      }
      // console.log(response,'SS response');
      // console.log(this.scenarioSelectData,'scenarioSelectData');
    }, (error) => {

    })
  }

  /** Load Previously Selected values */
  selectCheck() {
    if (this.scenID.length > 0) {
      // console.log(this.scenID.length, 'scenID.length');
      for (var i = 0; i < this.scenID.length; i++) {
        for (var j = 0; j < this.scenarioSelectData.length; j++) {
          if (this.scenID[i] == this.scenarioSelectData[j].scenario_id) {
            this.selection.toggle(this.scenarioSelectData[j]);
            // console.log(this.scenarioSelectData[j]);
          }
        }
      }
    }
  }

  navEditScenario(scenario_id: any, content: any) {
    this.scenarioComparisionService.getPermissionToEdit(scenario_id).subscribe((resp: any) => {
      let res = resp;

      if (res.http_code == constant.login_page.reponseCode) {
        if (res.data) {
          this.router.navigate([constant.NAVIGATION.EDIT_SCENARIO, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
        } else {
          this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

        }
      }
    }, (error) => {

    })
  }

  navCopyScenario(scenario_id: any) {
    this.router.navigate([constant.NAVIGATION.COPY_SCENARIO, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
  }


  /**Language Translation Call */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  /**Date Filter API Call */
  dateFilterApiCall() {
    this.scenarioComparisionService.getScenarioslist(this.payload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.scenarioSelectData = response.data.data;
        this.count = response.data.total_count;
        this.dataSource = new MatTableDataSource(this.scenarioSelectData);
      }
    }, (error) => {

    })
  }
  gList: any = [];
  /**Geo List */
  showCoopTableModel(content: any, geoListdata: any) {
    this.gList = geoListdata;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  PopUpHeading: any;
  PopUpValue: any;
  showvalue(value: any, body: any, header: any) {
    this.PopUpHeading = header;
    this.PopUpValue = body;
    this.modalService.open(value, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /** Start Date Change */
  start_Dt(event: any) {
    var start_dt = event.value;
    this.stDate = this.datepipe.transform(start_dt, constant.preview_page.dateFormat);

  }


  /** Dynamic Pagination */
  pageEvent(event: PageEvent) {

    this.startdt = [];
    this.selection.clear();
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    this.scenarioSelectionApiCall()
  }

  getSortedData(sort: Sort) {
    // console.log(sort);
    if (!this.utils.isNullOrEmptyOrUndefined(sort.direction)) {
      // console.log(sort);
      this.value_order = sort.direction;
      this.sort_value = sort.active;
      if (this.sort_value == "geo") {
        this.sort_value = "coop";
      }
      this.sorting.order_by = sort.active;
      this.sorting.sort = sort.direction;
      this.scenarioSelectionApiCall();
    } else { }
  }

  /** Reset Filter */
  resetFilter() {
    this.value_order = "asc";
    this.sort_value = "scenario_id";
    this.scenarioName = undefined;
    this.stDate = undefined;
    this.scenarioID = undefined;
    this.geo = undefined;
    this.geoId_name = [];
    this.promoId_name = [];
    this.promoType = undefined;
    this.discountDurationList = [];
    this.discountDurationValue = [];
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.scenarioSelectionApiCall();
  }

  /** Select All Checkbox */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Checking Scenarios */
  checkSceID(row: any, checked: any) {
    if (checked.checked) {
      // console.log(row);
      this.startdate.push(row.start_date);
      this.duration.push(row.offers.discount_duration);
      this.scenID.push(row.scenario_id);
      this.scenName.push(row.scenario_name)
      // console.log(this.scenName);

      if (this.scenName.length > constant.preview_page.one) {
        this.samePackageNameValidation(checked);
      }

      this.maxFiveValidation();

    } else {
      this.uncheckSamePackageNameValidation(row, checked);
    }
  }

  /** Uncheck Same package Name validation */
  uncheckSamePackageNameValidation(row: any, checked: any) {
    var index = this.scenName.indexOf(row.scenario_name);
    this.scenName.splice(index, constant.preview_page.one);
    // console.log(this.scenName);
    var scenIndex = this.scenID.indexOf(row.scenario_id);
    this.scenID.splice(scenIndex, constant.preview_page.one);
    this.samePackageNameValidation(checked);
  }

  /** Same package Name validation */
  samePackageNameValidation(checked: any) {
    const nameNotEqual = this.scenName.every((x: any) => x === this.scenName[0])

    if (this.scenName.length != constant.preview_page.one && this.scenName.length != constant.preview_page.zero) {
      if (nameNotEqual == true) {
        this.comparebtn = true;
        if (checked.checked == true) {
          this.toastr.warning(this.utils.languageTranslator(constant.scenario_planner.sameScenarioName))
        } else { }
      } else {
        this.comparebtn = false;
      }
    } else {
      this.comparebtn = true;
    }

  }




  /** Maximum Five Scenarios Validation */
  maxFiveValidation() {

    if (this.scenName.length > constant.preview_page.five) {
      this.comparebtn = true;
      this.toastr.warning(constant.scenario_planner.maxfive);
    } else { }
  }

  /** Uncheck same date validation */
  uncheckSameDateValidation(row: any, checked: any) {
    var index = this.startdate.indexOf(row.start_date);
    this.startdate.splice(index, constant.preview_page.one);
    // var durIndex = this.duration.indexOf(row.offers.duration);
    // this.duration.splice(durIndex, constant.preview_page.one);
    var scenIndex = this.scenID.indexOf(row.scenario_id);
    this.scenID.splice(scenIndex, constant.preview_page.one);
    this.sameDateValidation(checked);
  }


  /** Same Date Validation*/
  sameDateValidation(checked: any) {
    const allEqual = this.startdate.every((v: any) => v === this.startdate[0]);
    // const durationEqual = this.duration.every((v: any) => v === this.duration[0]);
    if (this.startdate.length != constant.preview_page.one && this.startdate.length != constant.preview_page.zero) {
      if (allEqual == false) {
        this.comparebtn = true;
        if (checked.checked == true) {
          this.toastr.warning(this.utils.languageTranslator(constant.scenario_planner.sameStartdate))
        } else { }

      }

      else {
        this.comparebtn = false;
      }
    } else {
      this.comparebtn = true;

    }
  }
  /** compare scenario */
  scenarioCompare() {
    this.scenarioComparisionService.send_scenarioID(this.scenID);
    this.router.navigate([constant.NAVIGATION.SCENARIO_COMPARE]);

  }

  logSelection() {
    this.selection.selected.forEach(s => console.log(s.name));
  }

  scenarioResult(scenario_id: any, scenario_name: any) {
    this.packageSummaryService.setScenarioId(scenario_id);
    this.scenarioDisountService.setScenarioName(scenario_name, 'scenario-selection');
    this.router.navigate([constant.NAVIGATION.SCENARIO_RESULTS, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
  }

  /** Get Config ID */
  getOfferConfigID(offer: any) {
    let offer_config_id;
    for (let i = 0; i < offer.length; i++) {
      offer_config_id = offer[i].offer_config_id
    }
    sessionStorage.setItem(constant.login_page.offerConfigId, offer_config_id)
  }

  /** Redirect to Scenario Name */
  navToScenarioNameEdit(scenario_id: any, flag: any) {
    if (flag == constant.preview_page.one) {
      this.router.navigate([constant.NAVIGATION.OFFER_CONFIGURATION, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
    } else {
      this.router.navigate([constant.NAVIGATION.EDIT_SCENARIO, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
    }
  }

  expandedDataSource(row: any, index: any) {
    this.expDataSource = new MatTableDataSource(row);
    this.openpanel(index);
  }

  openpanel(index: any) {
    for (let i = 0; i < this.OpenState.length; i++) {
      if (i == index) {
        this.OpenState[i] = true;
      }
      else {
        this.OpenState[i] = false;
      }
    }
  }
  closepanel(index: any) {
    for (let i = 0; i < this.OpenState.length; i++) {
      this.OpenState[i] = false;
    }
  }



  navToScenarioNameCopy(scenario_id: any, flag: any) {
    if (flag == constant.preview_page.one) {
      this.router.navigate([constant.NAVIGATION.OFFER_CONFIGURATION_COPY, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
    } else {
      this.router.navigate([constant.NAVIGATION.COPY_SCENARIO, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
    }

  }

  //delete section

  //delete api call
  deleteGo() {
    let deletePayload = { "offer_config_id": this.deleteConfigId }
    this.packageSummaryService.deleteSelectedPackage(deletePayload).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.scenarioSelectionApiCall();
        this.toastr.success(this.utils.languageTranslator(constant.login_page.deletmesag));
        this.cancelDismis()
      }
    }, (error) => {

    })
  }

  //delete function
  cancelModel(content: any, configId: any, flag: any) {

    this.deleteConfigId = configId
    this.contentShow = flag
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //close dialog
  cancelDismis() {
    this.modalService.dismissAll();
  }

  fixedFormat(event: any) {
    return this.utils.toFixedFormat(+event, constant.OFFER_CONFIGURATION.pctDecimal);
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

  /** Geo Select All*/
  onGeoSelectAll(allSegment: any) {
    this.selectAllstatus = allSegment;
    for (var i = 0; i < this.selectAllstatus.length; i++) {
      this.geoId_name.push(this.selectAllstatus[i].geo_name);
    }

  }

  /**Geo Select Select*/
  onGeoSelect(status: any) {
    this.geoId_name.push(status.geo_name);

  }

  /** Geo Deselect All*/
  onGeoDeSelectAll(promoAll: any) {
    this.geoId_name = [];

  }

  /** Geo Deselect*/
  onGeoDeSelect(deselectStatus: any) {
    var statId = deselectStatus.geo_name;
    const index = this.geoId_name.indexOf(statId);
    this.geoId_name.splice(index, constant.preview_page.one);

  }

  /** Promo Channel Select*/
  onPromoSelect(promo: any) {
    this.promoId_name.push(promo.promo_types);
  }

  /** Promo Channel Select All*/
  onSelectAll(allPromo: any) {
    this.selectAllpromo = allPromo;
    for (var i = 0; i < this.selectAllpromo.length; i++) {
      this.promoId_name.push(this.selectAllpromo[i].promo_types);
    }
  }

  /** Promo Channel Deselect*/
  onpromoDeSelect(deselectPromo: any) {
    var promId = deselectPromo.promo_types;
    const index = this.promoId_name.indexOf(promId);
    this.promoId_name.splice(index, constant.preview_page.one);
  }

  /** Promo Channel Deselect All*/
  onDeSelectAll(promoAll: any) {
    this.promoId_name = [];
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
      return day == 1; // 1 means monday, 0 means sunday, etc.
    };

  readAndWritePermission() {

    this.readAndWriteService.getUserReadAndWriteData().subscribe((resp: any) => {
      if (constant.NAVIGATION.SCENARIO_COMPARISON == resp.data.scenario_comparison.scenario_list_page.link) {
        this.show_edit_copy_menu_option = resp.data.scenario_comparison.scenario_list_page.show_edit_copy_menu_option;
      }
    }, (error) => {

    });


  }
}
