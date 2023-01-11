import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { OfferPackageDetailService } from '../../services/offer-package-detail.service';


@Component({
  selector: 'app-offer-package-details',
  templateUrl: './offer-package-details.component.html',
  styleUrls: ['./offer-package-details.component.scss']
})
export class OfferPackageDetailsComponent implements OnInit {
  //Offer Package Name details initializer

  startDate: any
  promoChannel: any
  packageSummaryDataList: any = []
  coopDataList: any = []
  selectedCoopDetailList: any = []
  competitiondiscounts: any = []
  offerDuration: any = []
  geoChannelPromoTypeDataList: any = [];
  coop_data: any = [];
  dayPart: any = [];
  week: any = constant.packageSummaryDetails.week;
  promo_item_1: any = constant.packageSummaryDetails.promo_item_1;
  promo_item_2: any = constant.packageSummaryDetails.promo_item_2;
  //Expandable view
  expandEnable: boolean = false
  //Model view initializer
  geoList: any = [];
  channelList: any = [];
  itemList: any = []
  categoryList: any = []
  maxOffersList: any = []
  promoMechanicList: any = []
  maxPromoList: any = []
  closeResult: any;
  selectedLanguage: any;
  package_Id: any

  // Show hide 
  apiFailed: boolean = false;

  @Output() setDiscountPackagePage = new EventEmitter<string>();
  constructor(public translate: TranslateService, private modalService: NgbModal, public constantService: ConstantService, public offerPackageDetailService: OfferPackageDetailService) { }

  ngOnInit(): void {
    this.baseApiLoader()
    this.initialLanguageCall()
  }

  //Initialize Api call
  baseApiLoader() {
    this.getPackageSummaryDetailApiCall()
  }

  //Api call for offer pakage details
  getPackageSummaryDetailApiCall() {
    let offerConfigId: any = sessionStorage.getItem(constant.login_page.offerConfigId)
    this.package_Id = offerConfigId.replaceAll('"', '');

    var payload = {
      package_id: this.package_Id != null ? this.package_Id : "",
    }

    this.offerPackageDetailService.getPackageSummaryDetail(payload).subscribe((response: any) => {
      let res = response;
      let packageName;

      this.packageSummaryDataList = res.data;
      this.apiFailed = true;

      packageName = this.packageSummaryDataList.scenario_name;
      this.coop_data = this.packageSummaryDataList.coops;
      // console.log("Coops", this.coop_data);

      // sessionStorage.setItem(constant.offer_package_detail.is_edit, JSON.stringify(this.packageSummaryDataList.is_edit));
      this.setDiscountPackagePage.emit(packageName);
      this.getGeoChannelPromoType(this.packageSummaryDataList);
      this.setDetailViewData(this.coop_data);

    }, (error) => {
      this.apiFailed = false;
    })

  }

  // Setting package details inside below method
  setDetailViewData(coop_data: any) {

    // sessionStorage.setItem(constant.login_page.packagename, coop_data.offer_package_name)
    // sessionStorage.setItem(constant.login_page.packageId, offerSummaryDataList.offer_package_id)
    this.coopDataList = coop_data;
    this.coopDetailData('', this.coopDataList[0].ohm_id, this.coopDataList[0].promo_type);
  }

  getGeoChannelPromoType(packageSummaryDataList: any) {
    let channel: any;
    let coop_promoType: any = [];
    let coopData: any;
    channel = packageSummaryDataList.channel;
    coopData = packageSummaryDataList.coops;
    for (let j = 0; j < coopData.length; j++) {
        coop_promoType[j] = { 'ohm_id': coopData[j].ohm_id, 'geoChannelPromoType': coopData[j].coop_name + ' ' + channel + ' ' + coopData[j].promo_type, 'promo_type': coopData[j].promo_type };
        this.geoChannelPromoTypeDataList.push(coop_promoType[j]);
      
    }

    // console.log("Channel", channel);
    // console.log("Coop Data", coopData);
    // console.log("Coop and promo data", coop_promoType);
    // console.log("Final Result", this.geoChannelPromoTypeDataList);


  }

  //Selected coop Tab based value change 
  coopDetailData(index: any, coopId: any, p_type: any) {
    // console.log(index, coopId, p_type);
    let coopindexdata = Object.assign([], this.selectedCoopDetailList)
    coopindexdata = this.coopDataList.filter((x: { ohm_id: any; }) => x.ohm_id == coopId);
    //this.promoChannel = coopindexdata[0].promo_id == constant.login_page.one ? constant.login_page.online : constant.login_page.offline
    this.selectedCoopDetailList = coopindexdata.filter((x:{promo_type:any;}) => x.promo_type==p_type)[0];
    // console.log(this.selectedCoopDetailList);

    this.dayPart = coopindexdata[0].items.reduce((accumalator: any, current: any) => {
      if (
        !accumalator.some(
          (item: any) => item.day_part === current.day_part
        )
      ) {
        accumalator.push(current);
      }
      return accumalator;
    }, []);
    // console.log("Item", this.dayPart);

    // .filter((ele : any, i: any) => i ===coopindexdata[0].items.indexOf(ele));


  }

  //setPromoChannel  Data
  setPromoChannelData(promoData: any) {
    let promoArray = []
    for (var i = 0; i < promoData.length; i++) {
      promoArray.push(promoData[i].promo_name)
    }
    this.promoChannel = promoArray.join('; ')
  }


  // Expand enable/disable 
  expandExtend() {

    this.expandEnable = !this.expandEnable
  }

  // Model Item PopUp Code
  showItemModel(content: any, listItems: any) {
    var itemListGroups = new Set(listItems.map((item: { category: any; }) => item.category))
    this.itemList = [];
    itemListGroups.forEach(g =>
      this.itemList.push({
        category: g,
        items: listItems.filter((i: { category: any; }) => i.category === g)
      }
      ))
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Model product PopUp Code
  showCategoryModel(content: any, listCateg: any) {
    this.categoryList = listCateg;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // Model Maxoffers PopUp Code
  showMaxOffersModel(content: any, maxofferlist: any) {
    this.maxOffersList = maxofferlist;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Model PromoMechanic PopUp Code
  showPromoMechanicModel(content: any, promolist: any) {
    this.promoMechanicList = promolist;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Max Promo show popup
  showMaxPromoModel(content: any, maxPromoList: any) {
    this.maxPromoList = maxPromoList;
    this.modalService.open(content, { ariaLabelledBy: constant.login_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return constant.login_page.pressEsc;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return constant.login_page.byClickBack;
    } else {
      return `with: ${reason}`;
    }
  }
}