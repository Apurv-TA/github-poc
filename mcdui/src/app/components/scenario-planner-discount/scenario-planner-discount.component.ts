import { Component, OnInit, ViewChild, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../../shared/constant/constant';
import { MatTableDataSource } from '@angular/material/table';
import { ConstantService } from 'src/app/services/constant.service';
import { ScenarioDiscountServiceService } from 'src/app/services/scenario-discount-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtilService } from 'src/app/services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import { ScenarioImpactTableComponent } from '../scenario-impact-table/scenario-impact-table.component';
import { ToastrService } from 'ngx-toastr';
import { OfferPackageDetailService } from 'src/app/services/offer-package-detail.service';
import { ScenarioNameService } from 'src/app/services/scenario-name.service';
import { PackageSummaryService } from 'src/app/services/package-summary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scenario-planner-discount',
  templateUrl: './scenario-planner-discount.component.html',
  styleUrls: ['./scenario-planner-discount.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ScenarioPlannerDiscountComponent implements OnInit, OnDestroy {
  //Initial Variable Initializer
  dataSource!: MatTableDataSource<any>;
  impactIndexdataSource!: MatTableDataSource<any>;
  // Behaviour subject Subscription
  public subscription: Subscription = new Subscription();

  @ViewChild(ScenarioImpactTableComponent, { static: false })
  private impactTableComponent!: ScenarioImpactTableComponent;

  activePromosDisplayColumns: string[] = constant.offer_package_detail.activePromosDisplayColumns;
  promoEngineRecommendationDisplayColumns: string[] =
    constant.offer_package_detail.promoEngineRecommendationDisplayColumns;
  calculateImpactSelectedId: any = [];
  scenarioDiscountTableDataList: any = [];
  scenarioDiscountFilterTableDataList: any = [];
  expandedElement: any;
  tabIndex = 0;
  //Export Service
  exportFormDataList: any = [];
  //Model PopUp
  itemList: any = [];
  closeResult: any;

  selectedLanguage: any;
  offerConfigId: any;
  scenario_id: any;
  checkedAllLength!: number;

  //start and duration set
  startDate: any;
  weekDuration: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  enableImpactIndex: boolean = false;
  impactIndexWeightData: any;
  //Enable impact table
  impactByChannelTable: boolean = false;
  impactId: any = [];
  impactIdArray: any = [];
  getSelectedConfigId: any = [];
  detailedExportDisable: boolean = false;
  pakageName: any;

  //setCurrency
  currencyCode: any;
  recommendedNote: any;
  is_edit: boolean = false;
  impactUpdateBtn: boolean = false;

  activePromosTableData: any = [];
  promoEngineRecommendationTableData: any = [];
  activePromoDataSource: any;
  promoEngineRecommendationDataSource: any;

  week: string = constant.offer_package_detail.week;

  @Input('promoRecommenderFlag') promoRecommenderFlag: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    public translate: TranslateService,
    private modalService: NgbModal,
    public constantService: ConstantService,
    public scenarioDiscountServiceService: ScenarioDiscountServiceService,
    public packageSummaryService: PackageSummaryService,
    public router: Router,
    public offerRecommenderService: OfferRecommenderService,
    private urlService: UrlSecurityService,
    private toastr: ToastrService,
    public offerPackageDetailService: OfferPackageDetailService,
    public scenarioNameService: ScenarioNameService
  ) { }

  ngOnInit(): void {
    this.initialLanguageCall();
    this.baseApiLoader();
    this.checkUserAccess();
  }
  baseApiLoader() {
    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)
    let offerConfigId: any = this.urlService.decryptUsingAES256(
      this.activatedRoute.snapshot.params[constant.login_page.offerId]
    );
    this.offerConfigId = offerConfigId.replaceAll('"', '');
    sessionStorage.setItem(constant.login_page.offerIdScenario, this.offerConfigId);
    this.getOffersByPackage();
    this.getImpactTableCall();
    // this.configMaster()
  }

  scenarioOfferID: any = [];
  loadScenarioOfferID(scenario_offer_id: number) {
    this.scenarioOfferID.push(scenario_offer_id);
  }

  assignImpactIndexonTable(data: any, dataSource: any) {
    for (let i = 0; i < data.length; i++) {

      for (let j = 0; j < dataSource.length; j++) {
        if (dataSource[j].offer_id === data[i].offer_id && dataSource[j].coop === data[i].coop && dataSource[j].promo_type === data[i].promo_type) {
          dataSource[j].impact_index = data[i].impact_index;
          break
        }
      }


    }
  }


  calculateImpactIndexValues(dataSource: any) {
    let offers: any = [];
    let counter = 0;

    for (let i = 0; i < dataSource?.length; i++) {
      if (dataSource[i].ischecked == true) {
        offers[counter++] = dataSource[i];
      }
      else dataSource[i].impact_index = '';
    }

    var payload = {
      offers: offers
    };

    this.scenarioDiscountServiceService.calculateImpactIndexRank(payload).subscribe((response: any) => {
      this.assignImpactIndexonTable(response.data, dataSource);
    }, (error: any) => {
      this.toastr.error(error.error.data);
    })

  }

  buttonDisableCheck() {
    if (this.scenarioOfferID.length < this.checkedAllLength) this.detailedExportDisable = true;
    else this.detailedExportDisable = false;
  }

  scenarioOfferIDChange(event: any, scenario_offer_id: any, index: number, source: string) {
    if (source == 'fixed') this.activePromoDataSource.data[index].ischecked = event.checked;
    else this.promoEngineRecommendationDataSource.data[index].ischecked = event.checked;

    if (event.checked) {
      this.scenarioOfferID.push(scenario_offer_id);
      this.buttonDisableCheck();
    } else {
      var i = this.scenarioOfferID.indexOf(scenario_offer_id);
      this.scenarioOfferID.splice(i, 1);
      this.buttonDisableCheck();
    }
  }

  /**Check User Read Access */
  checkUserAccess() {
    this.impactUpdateBtn = this.utilService.userAccess(constant.userAccess.impact_update_btn);
  }

  /**Tab change  */
  changeTab(event: any) {
    this.tabIndex = event.index;
  }

  /** Impact Index Modal */
  impactIndexModel() {
    localStorage.getItem(constant.login_page.offerConfigId);
    this.enableImpactIndex = true;
    setTimeout(() => {
      this.enableImpactIndex = false;
    }, constant.preview_page.ten);
  }

  //looping for table list

  getScenarioListAddSelected() {
    let previouSelectedValue: any = [];
    if (!this.utilService.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.login_page.calculate_id_scenario))) {
      this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario);
      previouSelectedValue = this.getSelectedConfigId.split(',');
      for (let k = 0; k < previouSelectedValue.length; k++) {
        for (let i = 0; i < this.scenarioDiscountTableDataList.length; i++) {
          if (previouSelectedValue[k] == this.scenarioDiscountTableDataList[i].offer_id) {
            this.scenarioDiscountTableDataList[i].isselected = true;
            this.calculateImpactSelectedId.push(this.scenarioDiscountTableDataList[i].offer_id);
          }
        }
      }
    } else {
      for (let i = 0; i < this.scenarioDiscountTableDataList.length; i++) {
        this.calculateImpactSelectedId.push(this.scenarioDiscountTableDataList[i].offer_id);
        this.scenarioDiscountTableDataList[i].isselected = true;
      }
    }

    this.dataSource = new MatTableDataSource(this.scenarioDiscountTableDataList);
  }

  /** Other User Restriction */
  otherUSerRestriction() {
    let isEdit = JSON.parse(sessionStorage.getItem(constant.offer_package_detail.is_edit) || '{}');
    if (isEdit) {
      this.is_edit = true;
    } else {
      this.is_edit = false;
    }
  }

  /**Impact Index Data */
  impactIndexTableData() {
    this.otherUSerRestriction();
    let previouSelectedValue: any = [];
    if (!this.utilService.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.login_page.calculate_id_scenario))) {
      this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario);
      previouSelectedValue = this.getSelectedConfigId.split(',');
      for (let k = 0; k < previouSelectedValue.length; k++) {
        for (let i = 0; i < this.impactIndexWeightData.length; i++) {
          for (let j = 0; j < this.impactIndexWeightData[i].recommended_offer.length; j++) {
            if (previouSelectedValue[k] == this.impactIndexWeightData[i].offer_id) {
              this.impactIndexWeightData[i].isselected = true;
              this.calculateImpactSelectedId.push(this.impactIndexWeightData[i].offer_id);
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.impactIndexWeightData.length; i++) {
        this.calculateImpactSelectedId.push(this.impactIndexWeightData[i].offer_id);
        this.impactIndexWeightData[i].isselected = true;
      }
    }
    this.impactIndexdataSource = new MatTableDataSource(this.impactIndexWeightData);
  }

  /** Get Submit Details */
  getSubmitDetails(saveData: any) {
    let previouSelectedValue: any = [];
    this.impactIndexWeightData = saveData[constant.preview_page.zero].scenario_impact_index_data;
    if (!this.utilService.isNullOrEmptyOrUndefined(sessionStorage.getItem(constant.login_page.calculate_id_scenario))) {
      this.getSelectedConfigId = sessionStorage.getItem(constant.login_page.calculate_id_scenario);
      previouSelectedValue = this.getSelectedConfigId.split(',');
      for (let k = 0; k < previouSelectedValue.length; k++) {
        for (let i = 0; i < this.impactIndexWeightData.length; i++) {
          for (let j = 0; j < this.impactIndexWeightData[i].recommended_offer.length; j++) {
            if (previouSelectedValue[k] == this.impactIndexWeightData[i].offer_id) {
              this.impactIndexWeightData[i].isselected = true;
              this.calculateImpactSelectedId.push(this.impactIndexWeightData[i].offer_id);
            }
          }
        }
      }
    } else {
      for (let i = 0; i < this.impactIndexWeightData.length; i++) {
        this.calculateImpactSelectedId.push(this.impactIndexWeightData[i].offer_id);
        this.impactIndexWeightData[i].isselected = true;
      }
    }
    this.impactIndexdataSource = new MatTableDataSource(this.impactIndexWeightData);
    this.enableImpactIndex = false;
  }

  /** Payload for Calculate Impact**/
  payload() {
    var payload = {
      scenario_id: this.scenario_id,
      scenario_offer_id: this.scenarioOfferID,
    };
    return payload;
  }

  calculateImpactData: any;

  calculateImpact() {
    this.scenarioDiscountServiceService.calculateImpact(this.payload()).subscribe((response: any) => {
      this.calculateImpactData = response.data.tabledata;
      // let FixedPromoDataSource = this.activePromoDataSource.data;
      let RecommendedPromoDataSource = this.promoEngineRecommendationDataSource.data;
      // this.calculateImpactIndexValues(FixedPromoDataSource);
      this.calculateImpactIndexValues(RecommendedPromoDataSource);
      // this.calculateImpactData = constant.GeoOffersData.data;
      this.impactId = this.calculateImpactData;
      this.impactTableComponent.impactDataId = this.impactId;
      this.impactTableComponent.DataSourceUpdateOnClick();
    }, (error: any) => {
      this.toastr.error(error.error.data);
    })
  }

  /** Get Config Master */
  // configMaster() {
  //   this.offerRecommenderService.getCongigurationService().subscribe(
  //     (response: any) => {
  //       this.recommendedNote = response.data.discount_result_recommendeder_note;
  //     },
  //     (error) => { }
  //   );
  // }

  //impact api call

  getImpactTableCall() {
    this.impactId = [];
    this.impactByChannelTable = true;
  }

  //Redirect to Impact page
  impactDetail() {

    if (this.promoRecommenderFlag) {
      this.promoRecommenderFlag = false;
      this.router.navigate([constant.NAVIGATION.RECOMMENDED_IMPACT, this.urlService.encryptUsingAES256(this.offerConfigId)]);

    } else {
      this.router.navigate([constant.NAVIGATION.SCENARIO_IMPACT, this.urlService.encryptUsingAES256(this.offerConfigId)]);
    }
  }
  getSelectedSegmentvalue(segmentId: any, event: any) {
    if (event.checked) {
      for (let i = 0; i < this.scenarioDiscountTableDataList.length; i++) {
        if (this.scenarioDiscountTableDataList[i].offer_id == segmentId) {
          this.scenarioDiscountTableDataList[i].isselected = true;
          this.calculateImpactSelectedId.push(this.scenarioDiscountTableDataList[i].offer_id);
        }
      }
    } else {
      for (let i = 0; i < this.scenarioDiscountTableDataList.length; i++) {
        if (this.scenarioDiscountTableDataList[i].offer_id == segmentId) {
          this.scenarioDiscountTableDataList[i].isselected = false;
          const index1 = this.calculateImpactSelectedId.indexOf(segmentId);
          this.calculateImpactSelectedId.splice(index1, 1);
        }
      }
    }
    this.dataSource = new MatTableDataSource(this.scenarioDiscountTableDataList);
  }
  getSelectedSegmentIndexvalue(segmentId: any, event: any) {
    if (event.checked) {
      for (let i = 0; i < this.impactIndexWeightData.length; i++) {
        if (this.impactIndexWeightData[i].offer_id == segmentId) {
          this.impactIndexWeightData[i].isselected = true;
          this.calculateImpactSelectedId.push(this.impactIndexWeightData[i].offer_id);
        }
      }
    } else {
      for (let i = 0; i < this.impactIndexWeightData.length; i++) {
        if (this.impactIndexWeightData[i].offer_id == segmentId) {
          this.impactIndexWeightData[i].isselected = false;
          const index1 = this.calculateImpactSelectedId.indexOf(segmentId);
          this.calculateImpactSelectedId.splice(index1, 1);
        }
      }
    }
    this.impactIndexdataSource = new MatTableDataSource(this.impactIndexWeightData);
  }

  //Export download
  exportDownload() {
    this.offerPackageDetailService.exportSendDataList(this.scenario_id).subscribe((response: any) => {
      this.utilService.downloadFile(response)
    }, (error: any) => {
    })
  }

  ///Item Model Popup
  showItemModel(content: any, listItems: any) {
    this.itemList = listItems;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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
  /** Language Translation */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia]);
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
    } else {
    }
  }

  /** Fixed Format */
  fixedFormat(event: any) {
    return this.utilService.toFixedFormat(+event, constant.OFFER_CONFIGURATION.pctDecimal);
  }

  getScenarioId() {

    this.subscription.add(this.packageSummaryService.getScenarioId().subscribe((val: any) => {
      this.scenario_id = val;
    }, (error) => {
    })
    )
  }

  //Binding Api Response
  getOffersByPackage() {
    this.getScenarioId();
    this.scenarioDiscountServiceService.getOffersByPackage(this.scenario_id).subscribe(
      (Res: any) => {
        // let res = constant.offersByPackage.TABLE_DATA;
        let res = Res;
        if (res.http_code == constant.login_page.reponseCode) {

          res.data.forEach((element: any) => {
            element.ischecked = true;
            if (element.source === 'fixed') {
              this.activePromosTableData.push(element);
              this.loadScenarioOfferID(element.scenario_offer_id);
            } else if (element.source === 'recommended') {
              this.promoEngineRecommendationTableData.push(element);
              this.loadScenarioOfferID(element.scenario_offer_id);
            }
          });
          this.activePromoDataSource = new MatTableDataSource(this.activePromosTableData);
          this.promoEngineRecommendationDataSource = new MatTableDataSource(this.promoEngineRecommendationTableData);
          this.checkedAllLength = this.scenarioOfferID.length;
        }
      },
      (error) => { }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
