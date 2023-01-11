import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as constant from '../../shared/constant/constant';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConstantService } from '../../services/constant.service';
import { OfferRecommenderService } from '../../services/offer-recommender.service';
import { UtilService } from 'src/app/services/util.service';
import { UrlSecurityService } from 'src/app/services/url-security.service';
import { DatePipe } from '@angular/common';
import { OfferPackageDetailService } from 'src/app/services/offer-package-detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-recommender',
  templateUrl: './offer-recommender.component.html',
  styleUrls: ['./offer-recommender.component.scss']
})
export class OfferRecommenderComponent implements OnInit {
  public subscription: Subscription = new Subscription();

  //Lang Translate
  selectedLanguage: any;
  //initial data
  previewResponse: any;
  previewResponseSave: any;
  show = false;

  isItemModel: boolean = false;
  closeResult: any;
  itemList: any;
  categoryList: any;
  maxOffersList: any;
  dayPartList: any;
  offerConfigId: any;
  promoMechanicList: any;
  compDiscounts: any;
  compDisc: any;
  offerPackageName: any;
  showbtnhide: boolean = false;
  showmore: boolean = false;
  cancelshow: boolean = false;
  prev: boolean = false;
  prev_back: boolean = false;


  isCopyScreen: boolean = false;
  private getRouteParams: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    public translate: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public constantService: ConstantService,
    public offerRecommenderService: OfferRecommenderService,
    private offerPackageService: OfferPackageDetailService,
    private utils: UtilService,
    private datepipe: DatePipe,
    private urlSecurityService: UrlSecurityService) { }

  ngOnInit(): void {
    this.initialLangCall();
    this.initialDataCall();
  }

  initialLangCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    }
  }

  initialDataCall() {
    let paramOfferConfigId = this.activatedRoute.snapshot.params[constant.login_page.offerId];
    console.log(this.activatedRoute);
    if (!this.utils.isNullOrEmptyOrUndefined(paramOfferConfigId) &&
      this.activatedRoute.snapshot.params[constant.OFFER_CONFIGURATION.type] != constant.OFFER_CONFIGURATION.copy) {
      this.offerConfigId = this.urlSecurityService.decryptUsingAES256(paramOfferConfigId);
      this.offerPackageService.getPackageSummaryDetailPreview(this.offerConfigId).subscribe((response: any) => {
        if (response.http_code == constant.login_page.reponseCode) {
          this.previewResponse= response.data.coops;
          this.previewResponseSave = response.data.coops;
          this.offerPackageName = this.previewResponse.offer_package_name;
          this.getInitInfo();
          this.getPrevHeader();
        }
      }, (error) => {
        this.toastr.error(error.error.data)
      });
    } else {
      // To be remove and make it to dynamic
      this.previewResponse= JSON.parse(sessionStorage.getItem(constant.preview_page.getPreview) || '{}');
      this.previewResponseSave = JSON.parse(sessionStorage.getItem(constant.preview_page.getPreview) || '{}');
      this.compDiscounts = this.previewResponse.competition_discounts;
      this.validateCompDiscount();
      this.cancelshow = true;
      this.offerPackageName = this.previewResponse.offer_package_name;
      this.getInitInfo();
      if (!this.utils.isNullOrEmptyOrUndefined(this.activatedRoute.snapshot.params[constant.OFFER_CONFIGURATION.offerId])
        && this.activatedRoute.snapshot.params[constant.OFFER_CONFIGURATION.offerId] == constant.OFFER_CONFIGURATION.copy) {
        this.isCopyScreen = true;
      }
    }
  }
  
  getPrevHeader() {
    this.subscription.add(this.offerRecommenderService.getPrev().subscribe((val: any) => {
      this.prev = val;
      this.prev_back = val;
    },(error) =>{    
    })
    )
  }

  validateCompDiscount() {
    if (!this.utils.isNullOrEmptyOrUndefined(this.compDiscounts) && this.compDiscounts.length > 0) {
      if (this.compDiscounts[0].competition_brand_id == "") {
        this.showbtnhide = false;
      } else {
        this.showbtnhide = true;
      }
      if (this.compDiscounts.length > 1) {
        this.showmore = true;
      } else {
        this.showmore = false;
      }
    }
  }

  getInitInfo() {
    console.log(this.previewResponse);
  }

  discardOffer() {
    this.modalService.dismissAll();
    this.router.navigate([constant.NAVIGATION.JOB_SUMMARY])
  }

  cancelModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  submitModel(content: any) {
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showItemModel(content: any, listItems: any) {
    var itemListGroups = new Set(listItems.map((item: { category_name: any; }) => item.category_name))

    this.itemList = [];
    itemListGroups.forEach(g =>
      this.itemList.push({
        category_name: g,
        items: listItems.filter((i: { category_name: any; }) => i.category_name === g)
      }
      ))

    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  showCategoryModel(content: any, listCateg: any) {
    this.categoryList = listCateg;
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showPromoMechanicModel(content: any, promoMechanic: any) {
    this.promoMechanicList = promoMechanic;
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showCompDiscModel(content: any, compDisc: any) {
    this.compDisc = compDisc;
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onClose() {
    this.isItemModel = false;
  }

  showMaxOffersModel(content: any, maxOffers: any) {
    this.maxOffersList = maxOffers;
    this.modalService.open(content, { ariaLabelledBy: constant.preview_page.modalBasic }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  showDayPartModel(content: any, dayPartList: any) {
    this.dayPartList = dayPartList;
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

  ohmDataPayload(){
    let x = [];
    for(let i=0;i<this.previewResponse.length;i++){
      x.push(
        {
          data: [
            {
              ohm_id: this.previewResponseSave[i].parent_ohm_id,
              ohm_name: this.previewResponseSave[i].coop_name,
                data: [
                  {
                    ohm_id: this.previewResponseSave[i].child_ohm_id,
                    promo_type: this.previewResponseSave[i].promo_type,
                    start_date: this.previewResponseSave[i].start_date,
                    duration_max: this.previewResponseSave[i].duration[1],
                    duration_min: this.previewResponseSave[i].duration[0],
                    fixed_promo: 'Y',
                    product_categories: this.previewResponseSave[i].product_categories,
                    items: this.previewResponseSave[i].product.item,
                    objective: this.previewResponseSave[i].objective.maximize.objective_name,
                    objective_lower_bound: this.previewResponseSave[i].object_lower_bound,
                    n_promos_max: this.previewResponseSave[i].offer.no_of_offers[1],
                    n_promos_min: this.previewResponseSave[i].offer.no_of_offers[0],
                    max_promotions_day_part: this.previewResponseSave[i].maximum_day_part,
                    max_promotions_product_category: this.previewResponseSave[i].maximum_product_categories,
                    Active_Promos:this.get_active_promos(this.previewResponseSave[i]),
                    promo_mechanics: this.previewResponseSave[i].promo_mechanics, 
                    promo_depth_max1: this.previewResponseSave[i].offer.discount_depth[1],  
                    promo_depth_min1: this.previewResponseSave[i].offer.discount_depth[0],
                    promo_depth_max2: this.previewResponseSave[i].offer.discount_depth_two[1],
                    promo_depth_min2: this.previewResponseSave[i].offer.discount_depth_two[0],
                    competition_promo: '',
                    n_promos_product_categories: this.previewResponseSave[i].product_categories,
                    comp_offers:this.previewResponseSave[i].competition_discounts
                  }
                ]                        
              }
            ]       
          }
      );
    }
    return x;
  }
  get_active_promos(preview:any){
    let x = [];
    for(let i=0;i<preview.fixed_promos.length;i++){
      x.push({offer_id:preview.fixed_promos[i].offer_id_value,
        offer_price:preview.fixed_promos[i].offer_price,
        start_date:preview.fixed_promos[i].start_date,
        duration:preview.fixed_promos[i].duration
      });
    }
    return x;
  }
  offers_list:any = {};
  getOfferListdata() {
    this.subscription.add(this.offerRecommenderService.getOfferListdata().subscribe((val: any) => {
      this.offers_list = val;
    },(error) =>{    
    })
    )
  }
  offer_config_dictionary:any = {};
  getOfferConfigdata() {
    this.subscription.add(this.offerRecommenderService.getOfferConfigdata().subscribe((val: any) => {
      this.offer_config_dictionary = val;
    },(error) =>{    
    })
    )
  }

  /** Submit Api Service */
  submitOffer() {
    this.getOfferListdata();
    this.getOfferConfigdata();
    let geo_list_items = JSON.parse(sessionStorage.getItem(constant.preview_page.getSelectedGeoList) || '[]'); 
    let Payload =  {  
      scenario_name: this.previewResponseSave[0].offer_package_name,
      status: 'Submitted',
      ohm_channel: "Non Digital Mass",
      package_id: "",
      ohm_data:this.ohmDataPayload(),
      offer_list_data: this.offers_list,
      geo_list_data: geo_list_items,
      offer_config_data: this.offer_config_dictionary
    }
    this.offerRecommenderService.submitOfferService(Payload).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.modalService.dismissAll();
        this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
        console.log(response.data);
        this.toastr.success(response.data.status);
      }
    }, (error) => {
      this.toastr.error(error.error.data)
    })
  }

  /** update submit Api Service */
  updateSubmitOffer() {
    this.offerRecommenderService.updateSubmitOfferService(this.previewResponse).subscribe((response: any) => {
      if (response.http_code == constant.login_page.reponseCode) {
        this.modalService.dismissAll();
        this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
        this.toastr.success(this.utils.languageTranslator(constant.OFFER_CONFIGURATION.discountPackId) + " - " + response.data + " " + this.utils.languageTranslator(constant.login_page.submitSuccessMessage));
      }
    }, (error) => {
      this.toastr.error(error.error.data)
    })
  }

  submitOfferDto() {
    if (!this.utils.isNullOrEmptyOrUndefined(this.previewResponse.offer_config_id)) {
      if (this.isCopyScreen) {
        this.submitOffer();
      } else {
        this.updateSubmitOffer()
      }
    } else {
      this.submitOffer();
    }
  }

  /** Offer Configuration redirection */
  redirectToOfferConfig() {
    if (!this.utils.isNullOrEmptyOrUndefined(this.offerConfigId)) {
      this.router.navigate([constant.NAVIGATION.JOB_SUMMARY]);
    } else {
      this.router.navigate([constant.NAVIGATION.OFFER_CONFIGURATION_BACK_TO_PREVIEW])
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    }
}
