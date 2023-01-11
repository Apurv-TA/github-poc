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
import { PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ScenarioImportRecommenderService } from 'src/app/services/scenario-import-recommender.service';
import { OfferRecommenderService } from '../../services/offer-recommender.service';
import { UtilService } from 'src/app/services/util.service';
import { MatSort, Sort } from '@angular/material/sort';
import { UrlSecurityService } from "src/app/services/url-security.service";
import { Title } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageSummaryService } from 'src/app/services/package-summary.service';

@Component({
  selector: 'app-feed-selection',
  templateUrl: './feed-selection.component.html',
  styleUrls: ['./feed-selection.component.scss']
})
export class FeedSelectionComponent implements OnInit {

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
  displayedColumnsSub: string[] = constant.scenario_planner.scenarioSelectionSubCoulmns;

  selection = new SelectionModel<any>(true, []);
  dataSource!: MatTableDataSource<any>;
  feedSelectData: any;
  count: any;
  closeResult: any;

  panelOpenState = false;
  selectedScenario: any;
  scenarioID: any;
  filterdate: any;
  geo_name: any;
  promo_type: any;

  @ViewChild(MatSort) sort: MatSort = new MatSort;
  scenarioName: any;
  sorting = {
    sort: constant.offer_package_summary.desc, order_by: ""
  }

  /** Pagination */
  pageIndex = constant.preview_page.zero;
  limit: number = constant.preview_page.five;
  downloadbtn: boolean = true;
  scenarioCheck: any;
  configList: any;
  minYear: Date | undefined;
  maxYear = new Date();
  //setCurrency
  currencyCode: any
  discDuration: any = [];
  discountDurationList: any;
  discountDurationValue: any = [];
  geo: any;
  promoType: any;

  // For filter geo and promotype
  geoData: any = [];
  promoTypeData: any = [];
  selectAllstatus: any;
  geoId_name: any = [];
  promoId_name: any = [];
  selectAllpromo: any;
  expDataSource!: MatTableDataSource<any>;
  OpenState = [false, false, false, false, false];


  constructor(private router: Router,
    public translate: TranslateService,
    public constantService: ConstantService,
    private datepipe: DatePipe,
    private scenarioDisountService: ScenarioDiscountServiceService,
    private scenarioComparisionService: ScenarioComparisionService,
    private scenarioPlannerService: ScenarioImportRecommenderService,
    public offerRecommenderService: OfferRecommenderService,
    public packageSummaryService: PackageSummaryService,
    public utilService: UtilService,
    private urlSecurityService: UrlSecurityService,
    private modalService: NgbModal,
    private titleService: Title) { }


  ngOnInit(): void {
    this.initialAPICall()
    this.initialLanguageCall();
    this.configMaster();
    this.expDataSource.sort = this.sort;
    const sortState: Sort = { active: 'coop', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  /** Initial API Call */
  initialAPICall() {
    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)
    this.titleService.setTitle(constant.login_page.feed_creation);
    this.minDate.setDate(this.minDate.getDate() - constant.scenario_planner.start_date_val);
    sessionStorage.removeItem('offer_config_id');
    sessionStorage.removeItem('scenario_form');
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.start_Date = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.end_Date = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.feedSelectionApiCall();
  }


  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      // if (response.status == "success") {
      this.configList = response.data;
      this.minStartDate = this.utilService.startDateCalulationMin(this.configList.default_min_start_date);
      this.maxStartDate = this.utilService.startDateCalulationMax(this.configList.default_min_start_date, this.configList.default_max_start_date);
      this.minYear = this.utilService.createDateCalulationMin(this.configList.created_at_date);
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

  value_order = "asc";
  sort_value = "scenario_id";

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
    return payload;
  }

  filterDTO() {
    this.pageIndex = constant.preview_page.zero;
    this.filter();
  }

  /** Scenario Filter */
  filter() {
    this.scenarioComparisionService.getScenarioslist(this.filterPayload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.feedSelectData = response.data.list_of_scenario;
        this.count = response.data.total_count;
        this.dataSource = new MatTableDataSource(this.feedSelectData);
        this.dataSource.sort = this.sort;
        this.OpenState = []
        for (let i = 0; i < this.feedSelectData.length; i++) {
          this.OpenState.push(false);
        }

        this.selectCheck();
      }
    }, (error) => {

    })
  }

  /** Feed Selection List */
  feedSelectionApiCall() {
    let filterDropdownData: any;

    this.scenarioComparisionService.getScenarioslist(this.payload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.feedSelectData = response.data.list_of_scenario;
        this.count = response.data.total_count;
        this.dataSource = new MatTableDataSource(this.feedSelectData);
        this.OpenState = []
        for (let i = 0; i < this.feedSelectData.length; i++) {
          this.OpenState.push(false);
        }
        this.selectCheck();
        filterDropdownData = response.data.filter_data;
        this.geoData = filterDropdownData.geo.map((val: any, index: number) => ({ id: index, geo_name: val }));
        this.promoTypeData = filterDropdownData.promo_type.map((val: any, index: number) => ({ promo_id: index, promo_types: val }));
      }
    }, (error) => {

    })
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

  /** Date Filter API Call */
  dateFilterApiCall() {
    this.scenarioComparisionService.getScenarioslist(this.payload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.feedSelectData = response.data.list_of_scenario;
        this.count = response.data.total_count;
        this.dataSource = new MatTableDataSource(this.feedSelectData);
        this.OpenState = []
        for (let i = 0; i < this.feedSelectData.length; i++) {
          this.OpenState.push(false);
        }
      }
    }, (error) => {

    })
  }

  /** Start Date Change */
  start_Dt(event: any) {
    var start_dt = event.value;
    this.stDate = this.datepipe.transform(start_dt, constant.preview_page.dateFormat);
    
  }

  /** Dynamic Pagination */
  pageEvent(event: PageEvent) {
    this.selection.clear();
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    this.feedSelectionApiCall()
  }

  getSortedData(sort: Sort) {
    if (!this.utilService.isNullOrEmptyOrUndefined(sort.direction)) {
      // console.log(sort);
      this.value_order = sort.direction;
      this.sort_value = sort.active;
      if (this.sort_value == "geo") {
        this.sort_value = "coop";
      }
      this.sorting.order_by = sort.active;
      this.sorting.sort = sort.direction;
      this.feedSelectionApiCall();
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
    this.feedSelectionApiCall();
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
  cancelDismis() {
    this.modalService.dismissAll();
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


  innersort(event: any) {
    let x = this.expDataSource.filteredData;
    if (event.direction == 'asc') {
      x = x.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[event.active] > b[event.active] ? 1 : a[event.active] < b[event.active] ? -1 : 0);
    }
    else {
      x = x.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[event.active] < b[event.active] ? 1 : a[event.active] > b[event.active] ? -1 : 0);
    }
    this.expDataSource = new MatTableDataSource(x);
    // console.log("assigned", this.expDataSource);
  }


  /** Get Scenario ID */
  scenarioChange(row: any, event: any) {
    this.downloadbtn = false;
    this.scenarioID = row.scenario_id
  }

  /** Load Previously Selected values */
  selectCheck() {
    if (this.scenarioID) {
      for (var j = 0; j < this.feedSelectData.length; j++) {
        if (this.scenarioID == this.feedSelectData[j].scenario_id) {
          this.selection.toggle(this.feedSelectData[j])
        }
      }
    }
  }

  /** Scenario Download */
  scenarioDownload() {
    var payload = {
      scenario_id: this.scenarioID
    }
    this.scenarioPlannerService.exportFeedSelection(payload).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error) => {
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  scenaioResult(scenario_id: any, scenario_name: any) {
    this.packageSummaryService.setScenarioId(scenario_id);
    this.scenarioDisountService.setScenarioName(scenario_name, 'feed-selection')
    this.router.navigate([constant.NAVIGATION.SCENARIO_RESULTS, this.urlSecurityService.encryptUsingAES256(scenario_id)]);
  }

  fixedFormat(event: any) {
    return this.utilService.toFixedFormat(+event, constant.OFFER_CONFIGURATION.pctDecimal);
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

}