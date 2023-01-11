import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { PackageSummaryService } from '../../services/package-summary.service';
import { OfferRecommenderService } from '../../services/offer-recommender.service';
import { DatePipe } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/services/util.service';
import { Title } from "@angular/platform-browser";
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { AnySoaRecord } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { stat } from 'fs';
import { ThrowStmt } from '@angular/compiler';
import { ReviewUserService } from 'src/app/services/review-user.service';

export interface PeriodicElement {
  offer_package_id: number,
  offer_package_name: string;
  start_date: string;
  geo: string;
  segment_name: string;
  created_by: string;
  status_name: string;
  modified_at: string;
}

@Component({
  selector: 'app-job-summary',
  templateUrl: './job-summary.component.html',
  styleUrls: ['./job-summary.component.scss']
})
export class JobSummaryComponent implements OnInit, AfterViewInit {

  /**Table variable */
  displayedColumns: string[] = constant.offer_package_summary.displayColumns;
  coopsDisplayColumns: string[] = constant.offer_package_summary.coopsDisplayColumns;
  toppings = new FormControl();
  offerId: any;
  emptyshow: boolean = false;
  selectedLanguage: any;
  week: string = constant.offer_package_summary.week;

  from_page: any;
  createdBy: any;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**Filter variable */
  getAllOfferPAckage: any;
  // getAllCoopsOfferPackage: any;
  promoChannelData: any = [];
  selectedPromoChannel: any;
  promoId_name: any = [];
  segmentId_name: any = [];
  statusId_name: any = [];
  geoId_name: any = [];
  items: any = [];
  promodropdownSettings: any = constant.preview_page.promoDropdown;
  segmentdropdownSettings: any = constant.preview_page.segmentDropdown;
  statusdropdownSettings: any = constant.preview_page.statusDropdown;
  geodropdownSettings: any = constant.preview_page.geoDropdown;
  selectedStatus: any;
  segmentData: any = [];
  selectedSegment: any;
  totalCount: any;
  statusData: any = [];
  geoData: any = [];
  /**Filter variable */
  filter = {
    sort: constant.offer_package_summary.desc, order_by: ""
  }
  pageIndex = constant.preview_page.zero;
  limit: number = constant.preview_page.ten;
  filterValues = {
    offer_package_id: '',
    offer_package_name: '',
    created_by: ''
  };
  selectAllpromo: any;
  selectAllsegment: any;
  selectAllstatus: any;

  /**Datepicker variable */

  minDate = new Date();
  maxDate = new Date();
  maxStartDate: any;
  minStartDate: any;
  filterMaxDate = this.util.calculateWeaks(constant.OFFER_CONFIGURATION.start_date_default_weak);

  startDate: any;
  endDate: any;
  start_Date: any;
  end_Date: any;
  st_Date: any;
  en_Date: any;
  filterdate: any;
  offerName: any;
  channel: any = [];
  geo_name: any = [];
  status_name: any = [];
  promo_type: any = [];
  itemList: any = []
  closeResult: any
  configList: any;
  currentYear: any;
  currentMonth: any;
  minYear: any;
  maxYear = new Date();
  offerConfigId: any
  configure_discount: any;
  isCopyButton: boolean = false;

  // Read And Write Variables

  show_promo_config_button: boolean = false;
  show_edit_copy_menu_option: boolean = false;


  constructor(
    private util: UtilService,
    private modalService: NgbModal,
    public translate: TranslateService,
    private titleService: Title,
    public constantService: ConstantService,
    private router: Router, private route: ActivatedRoute,
    public offerRecommenderService: OfferRecommenderService,
    public packageSummaryService: PackageSummaryService,
    private datepipe: DatePipe,
    private urlService: UrlSecurityService,
    private toastr: ToastrService,
    public readAndWriteService: ReviewUserService) {
    this.route.queryParamMap.subscribe(resp => {
      this.from_page = resp.get('from_page')
    })
  }

  dataSource!: MatTableDataSource<any>;
  coopDataSource!: MatTableDataSource<any>;


  ngOnInit(): void {
  
    this.initialLanguageCall();
    this.initialAPIcall();
    this.configMaster();
    this.readAndWritePermission()
  }


  /** Initial Language Call */
  initialLanguageCall() {
    this.titleService.setTitle(constant.login_page.offer_recommend);
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  /** Initial API Call */
  initialAPIcall() {
    sessionStorage.setItem(constant.login_page.pageCheck, constant.login_page.zero)
    this.minDate.setDate(this.minDate.getDate() - constant.scenario_planner.start_date_val);
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.start_Date = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.end_Date = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.getAllOfferConfiguration();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  /** User Access */
  checkUserAccess() {
    this.configure_discount = this.util.userAccess(constant.userAccess.discount_recommen_configure_dis);
    this.isCopyButton = this.util.userAccess(constant.userAccess.sc_copy_btn);
  }

  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      
      let temp = {
        offer_config_start_date_value: "1",
        offer_config_end_date_value: "30",
        lower_bond_perc: "0",
        set_max_offer_default: "10",
        discount_depth_range_min: "20",
        discount_depth_min: "10",
        discount_depth_max: "50",
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
      localStorage.setItem('configuration', JSON.stringify(temp));
      this.configList = response.data;
      
    }, (error) => { })
  }


  // Main function with filter payloads
  getAllOfferConfiguration() {
    this.packageSummaryService.getAllOfferConfiguration(this.payload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      let res = response
      
      let filterDropdownData;

      if (res.http_code == constant.login_page.reponseCode) {
        this.getAllOfferPAckage = res.data.data;
        this.dataSource = new MatTableDataSource(this.getAllOfferPAckage);
        this.dataSource.sort = this.sort;
        filterDropdownData = res.data.filters;
        this.geoData = filterDropdownData.geos.map((val: any, index: number) => ({ id: index, geo_name: val }));
        this.segmentData = filterDropdownData.channels.map((val: any, index: number) => ({ segment_id: index, channels: val }));
        this.promoChannelData = filterDropdownData.promo_types.map((val: any, index: number) => ({ promo_id: index, promo_types: val }));
        this.statusData = filterDropdownData.status.map((val: any, index: number) => ({ id: index, status: val }));
        let status = ['Completed', 'Submitted', 'Failed'];
        let temp = [];
        for (let j = 0; j < status.length; j++) {
          for (let i = 0; i < this.statusData.length; i++) {
            if (this.statusData[i].status == status[j]) {
              temp.push(this.statusData[i]);
            }
          }
        }
        this.statusData = temp;
        this.totalCount = res.data.total_count;

        if (this.getAllOfferPAckage.length == 0 && (sessionStorage.getItem(constant.login_page.pageCheck) != constant.login_page.one)) {
          this.emptyshow = true;
        } else {
          this.emptyshow = false;
        }
      }

    }, (error) => {

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
      return day == 1; // 1 means monday, 0 means sunday, etc.
    };

  /** Navigate to Discount Configure */
  configureOffer() {
    this.router.navigate([constant.NAVIGATION.OFFER_CONFIGURATION]);
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

  /** Segment Select*/
  onSegmentSelect(seg: any) {
    this.segmentId_name.push(seg.channels);
  }

  /** Segment Select All*/
  onsegmentSelectAll(allSegment: any) {
    this.selectAllsegment = allSegment;
    for (var i = 0; i < this.selectAllsegment.length; i++) {
      this.segmentId_name.push(this.selectAllsegment[i].channels);
    }
  }

  /** Segment Deselect*/
  onsegmentDeSelect(deselectSegment: any) {
    var segId = deselectSegment.channels;
    const index = this.segmentId_name.indexOf(segId);
    this.segmentId_name.splice(index, constant.preview_page.one);
  }

  /** Segment Deselect All*/
  onsegmentDeSelectAll(promoAll: any) {
    this.segmentId_name = [];
  }

  /** Status Select*/
  onStatusSelect(status: any) {
    this.statusId_name.push(status.status);
  }

  /** Status Select All*/
  onStatusSelectAll(allSegment: any) {
    this.selectAllstatus = allSegment;
    for (var i = 0; i < this.selectAllstatus.length; i++) {
      this.statusId_name.push(this.selectAllstatus[i].status);
    }
  }

  /** Status Deselect*/
  onStatusDeSelect(deselectStatus: any) {
    var statId = deselectStatus.status;
    const index = this.statusId_name.indexOf(statId);
    this.statusId_name.splice(index, constant.preview_page.one);
  }

  /** Status Deselect All*/
  onStatusDeSelectAll(promoAll: any) {
    this.statusId_name = [];
  }

  /**Geo Select Select*/
  onGeoSelect(status: any) {
    this.geoId_name.push(status.geo_name);

  }

  /** Geo Select All*/
  onGeoSelectAll(allSegment: any) {
    this.selectAllstatus = allSegment;
    for (var i = 0; i < this.selectAllstatus.length; i++) {
      this.geoId_name.push(this.selectAllstatus[i].geo_name);
    }

  }

  /** Geo Deselect*/
  onGeoDeSelect(deselectStatus: any) {
    var statId = deselectStatus.geo_name;
    const index = this.geoId_name.indexOf(statId);
    this.geoId_name.splice(index, constant.preview_page.one);

  }

  /** Geo Deselect All*/
  onGeoDeSelectAll(promoAll: any) {
    this.geoId_name = [];

  }

  /**Copy Button Navigation */
  navCopyPackage(scenario_id: any, status: any, content: any) {
    if (status == 'Completed')
      this.router.navigate([constant.NAVIGATION.OFFER_CONFIGURATION_COPY, this.urlService.encryptUsingAES256(scenario_id)]);
    else {
      this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  value_order = "asc";
  sort_value = "scenario_id";
  /**Filter Payload */
  filterPayload() {
    var payload = {
      scenario_id: this.offerId != null ? this.offerId : "",
      scenario_name: this.offerName != null ? this.offerName : "",
      offer_start_date: this.filterdate ? this.filterdate : "",
      status_name: this.statusId_name.length > 0 ? this.statusId_name : "",
      promo_type: this.promoId_name.length > 0 ? this.promoId_name : "",
      geo: this.geoId_name.length > 0 ? this.geoId_name : "",
      order_value: this.value_order,
      sort_column: this.sort_value
    }
    return payload;
  }

  /**Filter DTO */
  filterDTO() {
    this.pageIndex = constant.preview_page.zero;
    this.offerIdFilter();
  }

  /**Filter Api Call */
  offerIdFilter() {
    this.packageSummaryService.getAllOfferConfiguration(this.filterPayload(), this.pageIndex + constant.preview_page.one, this.limit).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.getAllOfferPAckage = response.data.data;
        this.totalCount = response.data.total_count;
        this.dataSource = new MatTableDataSource(this.getAllOfferPAckage);
        this.dataSource.sort = this.sort;
      }
    });
  }




  /** Date Filter Payload */
  datefilterPayload() {
    var payload = {
      offer_package_id: this.offerId != null ? this.offerId : "",
      offer_package_name: this.offerName != null ? this.offerName : "",
      promo_id: this.promoId_name.length > 0 ? this.promoId_name : "",
      segment_id: this.segmentId_name.length > 0 ? this.segmentId_name : "",
      create_from_date: this.startDate ? this.startDate : "",
      create_to_date: this.endDate ? this.endDate : "",
      created_by: this.createdBy != null ? this.createdBy : "",
      status_name: this.statusId_name.length > 0 ? this.statusId_name : "",
      offer_start_date: this.filterdate ? this.filterdate : "",
      channel: this.channel ? this.channel : "",
      geo_name: this.geo_name ? this.geo_name : "",
      promo_type: this.promo_type ? this.promo_type : "",
    }
    return payload;
  }

 
 

  /** Pagination Call */
  pageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.limit = event.pageSize;
    sessionStorage.setItem(constant.login_page.pageCheck, constant.login_page.one)
    this.getAllOfferConfiguration()
  }

  /** Dynamic Sorting */
  getSortedData(sort: Sort) {
    if (!this.util.isNullOrEmptyOrUndefined(sort.direction)) {
      console.log(sort);
      this.value_order = sort.direction;
      this.sort_value = sort.active;
      this.filter.order_by = sort.active;
      this.filter.sort = sort.direction;
      this.getAllOfferConfiguration();
    } else { }
  }

  /** Start Date */
  dateRangeChange(event: any) {
    var end_date = event.value;
    this.filterdate = this.datepipe.transform(end_date, constant.preview_page.dateFormat);
  }

  /** Initial Payload */
  payload() {
    var payload = {
      scenario_id: this.offerId != null ? this.offerId : "",
      scenario_name: this.offerName != null ? this.offerName : "",
      offer_start_date: this.filterdate ? this.filterdate : "",
      status_name: this.statusId_name.length > 0 ? this.statusId_name : [],
      promo_type: this.promoId_name.length > 0 ? this.promoId_name : [],
      geo: this.geoId_name.length > 0 ? this.geoId_name : [],
      order_value: this.value_order,
      sort_column: this.sort_value
    }
    return payload
  }

  // coops table popup 
  showCoopTableModel(content: any, coopTableData: any) {
    this.itemList = coopTableData;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  /** Offer Details Navigation */
  onOfferdetailNavigation(status: any, offerConfigId: any, edtiStatus: boolean, scenarioId: any) {
    
    if (status == constant.login_page.completed) {
      let calculateImpactSelectedId: any = []
      sessionStorage.setItem(constant.login_page.calculate_id, calculateImpactSelectedId)
      sessionStorage.setItem(constant.login_page.pagefrom, constant.login_page.zero)
      this.packageSummaryService.setScenarioId(scenarioId)
      this.router.navigate([constant.NAVIGATION.OFFER_PACKAGE_SUMMARY, this.urlService.encryptUsingAES256(offerConfigId)]);
      
    }
    else if (status == constant.login_page.failed || status == constant.login_page.submitted) {
      if (edtiStatus) {
        this.router.navigate([constant.NAVIGATION.OFFER_CONFIGURATION, this.urlService.encryptUsingAES256(offerConfigId)]);
      } else {
        this.offerRecommenderService.send_Prev(true);
        this.router.navigate([constant.NAVIGATION.OFFER_RECOMMENDER_PREVIEW_SCREEN, this.urlService.encryptUsingAES256(offerConfigId)]);
      }
    }
    // }
  }

  /** Reset Functionality */
  Reset() {
    this.offerId = "";
    this.offerName = "";
    this.selectedPromoChannel = [];
    this.selectedSegment = [];
    this.filterdate = "";
    this.createdBy = "";
    this.geo_name = [];
    this.channel = [];
    this.promo_type = [];
    this.status_name = [];
    this.selectedStatus = [];
    this.statusId_name = [];
    this.promoId_name = [];
    this.geoId_name = [];
    this.value_order = "asc";
    this.sort_value = "scenario_id";
    this.st_Date = new FormControl(this.minDate);
    this.en_Date = new FormControl(this.maxDate);
    this.startDate = this.datepipe.transform(this.minDate, constant.preview_page.dateFormat);
    this.endDate = this.datepipe.transform(this.maxDate, constant.preview_page.dateFormat);
    this.getAllOfferConfiguration();
  }

  /** Date Convertion */
  dateConversation(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return year + '-' + month + '-' + day
  }

  
  //close dialog
  cancelDismis() {
    this.modalService.dismissAll();
  }
  //delete api call
  deleteGo() {
    let deletePayload = { "offer_config_id": this.offerConfigId }
    this.packageSummaryService.deleteSelectedPackage(deletePayload).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        // this.getAllOfferConfiguration() //Redirect to wrong window
        this.filterDTO()
        this.toastr.success(this.util.languageTranslator(constant.login_page.deletmesag));
        this.cancelDismis()
      }
    }, (error) => {

    })
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

  readAndWritePermission() {

    this.readAndWriteService.getUserReadAndWriteData().subscribe((resp: any) => {

      if (constant.NAVIGATION.JOB_SUMMARY == resp.data.promo_recommender.summary_list_page.link) {
        this.show_promo_config_button = resp.data.promo_recommender.summary_list_page.show_promo_config_button;
        this.show_edit_copy_menu_option = resp.data.promo_recommender.summary_list_page.show_edit_copy_menu_option;
      }
    }, (error) => {

    });


  }
}