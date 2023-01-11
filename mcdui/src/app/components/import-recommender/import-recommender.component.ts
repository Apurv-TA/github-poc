import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import * as constant from './../../shared/constant/constant';
import { PackageSummaryService } from '../../services/package-summary.service';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from '../../services/constant.service';
import { ScenarioImportRecommenderService } from '../../services/scenario-import-recommender.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from 'src/app/services/util.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { OfferRecommenderService } from '../../services/offer-recommender.service';
export let backToScenarioName = false;
@Component({
  selector: 'app-import-recommender',
  templateUrl: './import-recommender.component.html',
  styleUrls: ['./import-recommender.component.scss']
})



export class ImportRecommenderComponent implements OnInit {

  /**Language Translation */
  selectedLanguage: any;
  channelList: any = "Non Digital Mass";
  coopsDisplayColumns: string[] = constant.offer_package_summary.coopsDisplayColumns;
  week: string = constant.offer_package_summary.week;

  /** Import Scenario Declaration */
  offerRecommedData: any = [];
  segmentList: any;
  closeResult: any;
  selectedStatus: any;

  /** Pagination */
  pageIndex = constant.preview_page.zero;
  limit: number = constant.preview_page.five;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalCount: any;
  packageName: any;
  packageID: any;

  /** Date Range Filter */
  startDt = new Date;
  stDate: any;
  startDate: any;
  endDate: any;
  minDate = new Date();
  maxDate = new Date();
  maxStartDate = new Date();
  minStartDate = new Date();
  channel:any;
  st_Date: any;
  en_Date: any;
  start_Date: any;
  end_Date: any;
  geo_name: any;
  /** offerid */
  offerConfigID: any;
  promodropdownSettings: any = constant.preview_page.promoDropdown;
  segmentdropdownSettings: any = constant.preview_page.segmentDropdown;
  statusdropdownSettings: any = constant.preview_page.statusDropdown;
  geodropdownSettings: any = constant.preview_page.geoDropdown;

  dateForm: any = FormGroup;
  configList: any;
  minYear: any;
  maxYear = new Date();

  constructor(private router: Router,
    public packageSummaryService: PackageSummaryService,
    public translate: TranslateService,
    public constantService: ConstantService,
    private modalService: NgbModal,
    public scenarioImportService: ScenarioImportRecommenderService,
    public offerRecommenderService: OfferRecommenderService,
    private datepipe: DatePipe,
    private toastr: ToastrService,
    private utils: UtilService,
    private urlService: UrlSecurityService
  ) { }

  ngOnInit(): void {
    this.initialAPICall()
    this.initialLanguageCall();
    // this.configMaster();
  }

  /** Initial API Call */
  initialAPICall() {
    this.minDate.setDate(this.minDate.getDate() - constant.scenario_planner.start_date_val);
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.start_Date = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.end_Date = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.importRecommApiCall();

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

  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      // if (response.status == "success") {
      this.configList = response.data;
      // this.startDateCalulation(this.configList.default_min_start_date, this.configList.default_max_start_date);
      this.minStartDate = this.utils.startDateCalulationMin(this.configList.default_min_start_date);
      this.maxStartDate = this.utils.startDateCalulationMax(this.configList.default_min_start_date, this.configList.default_max_start_date);
      this.minYear = this.utils.createDateCalulationMin(this.configList.created_at_date);
      // this.maxYear = this.utils.createDateCalulationMax(this.configList.created_at_date);
      // }
    }, (error) => { })
  }

  /**Back to Scenario Landing Page */
  goBack() {
    backToScenarioName = false;
    this.router.navigate([constant.NAVIGATION.SCENARIO_LANDING]);
  }

  /** Package Name Search */
  searchPackage(event: any) {
    this.packageName = event.target.value;
    this.dateFilterApiCall();
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

  /** Start Date Change */
  start_Dt(event: any) {
    var start_dt = event.value;
    this.stDate = this.datepipe.transform(start_dt, constant.preview_page.dateFormat);
    // this.dateFilterApiCall();
  }

  /** Initial Payload */
  payload() {
    var payload = {
      scenario_id: !this.utils.isNullOrEmptyOrUndefined(this.packageID) ? this.packageID : "",
      scenario_name: !this.utils.isNullOrEmptyOrUndefined(this.packageName) ? this.packageName : "",
      offer_start_date: this.stDate ? this.stDate : "",
      status_name: ["Completed"],
      promo_type: this.promoId ? this.promoId:[],
      geo: this.geoId ? this.geoId: [],
      order_value:"asc",
      sort_column:"scenario_id"

    }
    return payload;
  }

  /** Filter Payload */
  filterPayload() {
    var payload = {
      scenario_id: !this.utils.isNullOrEmptyOrUndefined(this.packageID) ? this.packageID : "",
      scenario_name: !this.utils.isNullOrEmptyOrUndefined(this.packageName) ? this.packageName : "",
      offer_start_date: this.stDate ? this.stDate : "",
      status_name: ["Completed"],
      promo_type: this.promoId,
      geo: this.geoId,
      order_value:"asc",
      sort_column:"scenario_id"
    }
    return payload;
  }

  filterDTO() {
    this.pageIndex = constant.preview_page.zero;
    this.filter();
  }

  /** Package Filter */
  filter() {
    this.scenarioImportService.fetchOfferConfiguration(this.filterPayload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.offerRecommedData = response.data.data;
        this.totalCount = response.data.total_count;
        if (constant.preview_page.zero == this.totalCount) {
          this.toastr.warning(this.utils.languageTranslator(constant.scenario_planner.noOfferWarningMess))
        }
      }
    }, (error) => {

    })
  }

  /** Filter list */
  dateFilterApiCall() {
    this.scenarioImportService.getAllImportOffer(this.filterPayload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.offerRecommedData = response.data.data;
        this.totalCount = response.data.total_count;
        if (constant.preview_page.zero == this.totalCount) {
          this.toastr.warning(this.utils.languageTranslator(constant.scenario_planner.noOfferWarningMess))
        }
      }
    }, (error) => {

    })
  }

  /** Dynamic Pagination */
  pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    this.importRecommApiCall()
  }

  /** Item show popup */
  showItemModel(content: any, segments: any) {
    this.segmentList = segments;
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
  /**Radio Button Change */
  offerIdChange(event: any) {
    this.offerConfigID = event.value;
  }

  /** Reset Filters */
  OfferIdFilter() {
    this.packageName = "";
    this.packageID = "",
      this.stDate = "";
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.onDeSelectAll({});
    this.promo_type = [];
    this.onGeoDeSelectAll({});
    this.geo_name = [];
    this.onsegmentDeSelectAll({});
    this.channel = [];
    this.importRecommApiCall();
  }

  /** Navigate to Detailed Impact */
  onOfferdetailNavigation(offerConfigID: any, scenario_id:any, flag = 1) {
    let calculateImpactSelectedId: any = []
    sessionStorage.setItem(constant.login_page.calculate_id, calculateImpactSelectedId)
    sessionStorage.setItem(constant.login_page.pagefrom, constant.login_page.one)
    if (flag == constant.preview_page.one) {
      this.packageSummaryService.setScenarioId(scenario_id);
      this.router.navigate([constant.NAVIGATION.OFFER_PACKAGE_SUMMARY, this.urlService.encryptUsingAES256(offerConfigID)]);
    } else {
      this.router.navigate([constant.NAVIGATION.SCENARIO_RESULTS, this.urlService.encryptUsingAES256(offerConfigID)]);
    }

  }

  /** Import Scenario */
  importScenario() {
    backToScenarioName = false ;
    if (!this.utils.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.scenario_name.scenario_type))) {
      let type: string = JSON.parse(sessionStorage.getItem(constant.scenario_name.scenario_type) || '');
      this.router.navigate([constant.NAVIGATION.CREATE_SCENARIO + "/" + type, this.urlService.encryptUsingAES256(this.offerConfigID)]);
    } else {
      this.router.navigate([constant.NAVIGATION.CREATE_SCENARIO, this.urlService.encryptUsingAES256(this.offerConfigID)]);
    }
  }


  /** Back to scenario Name  */
  backToScenario(){
    backToScenarioName = true ;
    let currentOfferConfigId = sessionStorage.getItem(constant.scenario_name.current_offer_config_id) || '';
    if(!this.utils.isNullOrEmptyOrUndefined(currentOfferConfigId)){
      this.router.navigate([constant.NAVIGATION.CREATE_SCENARIO, this.urlService.encryptUsingAES256(currentOfferConfigId)]);
    }
  }


  validateBackToScenario(){
    let currentOfferConfigId = sessionStorage.getItem(constant.scenario_name.current_offer_config_id) || '';
    if(!this.utils.isNullOrEmptyOrUndefined(currentOfferConfigId)){
        return false;
    }
    return true;
  }

  cardData:any;
  filterData: any;
  
  filterdate: any;
  /** Start Date */
  dateRangeChange(event: any) {
    var end_date = event.value;
    this.filterdate = this.datepipe.transform(end_date, constant.preview_page.dateFormat);
  }

  promoChannelData: any;
  geoData: any;
  channelData: any;
  importRecommApiCall() {
    this.scenarioImportService.fetchOfferConfiguration(this.payload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.offerRecommedData = response.data.data;
        this.totalCount = response.data.total_count;
        this.filterData = response.data.filters;
        // this.promoChannelData = this.filterData.promo_types;
        this.promoChannelData = this.filterData.promo_types.map((val: any, index: number) => ({ promo_id: index, promo_types: val }));
        this.geoData = this.filterData.geos.map((val: any, index: number) => ({ id: index, geo_name: val }));
        this.channelData =  this.filterData.channels.map((val: any, index: number) => ({ segment_id: index, channels: val })); 
        this.channel = this.offerRecommedData.channel;
        if (constant.preview_page.zero == this.totalCount) {
          this.toastr.warning(this.utils.languageTranslator(constant.scenario_planner.noOfferWarningMess))
        }
      }
    }, (error) => {

    })
  }

  promo_type: any;
  selectedPromoChannel: any;
  promoId: any = [];
  selectAllpromo: any;
  /** Promo Channel Select*/
  onPromoSelect(promo: any) {
    this.promoId.push(promo.promo_types);
    console.log("L", this.promoId);
  }

  /** Promo Channel Select All*/
  onSelectAll(allPromo: any) {
    this.selectAllpromo = allPromo;
    for (var i = 0; i < this.selectAllpromo.length; i++) {
      this.promoId.push(this.selectAllpromo[i].promo_types);
    }
  }

  /** Promo Channel Deselect*/
  onpromoDeSelect(deselectPromo: any) {
    var promId = deselectPromo.promo_types;
    const index = this.promoId.indexOf(promId);
    this.promoId.splice(index, constant.preview_page.one);
  }

  /** Promo Channel Deselect All*/
  onDeSelectAll(promoAll: any) {
    this.promoId = [];
  }

  geoId: any = [];
  selectAllstatus: any;
  // **Geo Select Select*/
  onGeoSelect(status: any) {
    this.geoId.push(status.geo_name);
    
  }

  /** Geo Select All*/
  onGeoSelectAll(allSegment: any) {
    this.selectAllstatus = allSegment;
    for (var i = 0; i < this.selectAllstatus.length; i++) {
      this.geoId.push(this.selectAllstatus[i].geo_name);
    }
  }

  /** Geo Deselect*/
  onGeoDeSelect(deselectStatus: any) {
    var statId = deselectStatus.geo_name;
    const index = this.geoId.indexOf(statId);
    this.geoId.splice(index, constant.preview_page.one);
  }

  /** Geo Deselect All*/
  onGeoDeSelectAll(promoAll: any) {
    this.geoId = [];
  }

  segmentId: any = [];
  selectAllsegment: any;
  /** Segment Select*/
  onSegmentSelect(seg: any) {
    this.segmentId.push(seg.channels);
  }

  /** Segment Select All*/
  onsegmentSelectAll(allSegment: any) {
    this.selectAllsegment = allSegment;
    for (var i = 0; i < this.selectAllsegment.length; i++) {
      this.segmentId.push(this.selectAllsegment[i].channels);
    }
  }

  /** Segment Deselect*/
  onsegmentDeSelect(deselectSegment: any) {
    var segId = deselectSegment.channels;
    const index = this.segmentId.indexOf(segId);
    this.segmentId.splice(index, constant.preview_page.one);
  }

  /** Segment Deselect All*/
  onsegmentDeSelectAll(promoAll: any) {
    this.segmentId = [];
  }

}
