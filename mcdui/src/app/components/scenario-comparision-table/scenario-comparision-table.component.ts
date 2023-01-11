import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ConstantService } from 'src/app/services/constant.service';
import { ScenarioComparisionService } from 'src/app/services/scenario-comparision.service';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import * as constant from '../../shared/constant/constant';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-scenario-comparision-table',
  templateUrl: './scenario-comparision-table.component.html',
  styleUrls: ['./scenario-comparision-table.component.scss']
})
export class ScenarioComparisionTableComponent implements OnInit {
  
  dataSourceSegment!: MatTableDataSource<any>;
  dataSourceProduct!: MatTableDataSource<any>;
  dataSourceGeoPromoType!: MatTableDataSource<any>;
  displayedColumnsByGeoPromoType: string[] = [];
  displayedColumnsproduct: string[] = [];
  selectedSegment: any;
  selectedProduct: any;
  selectedLanguage: any
  overviewData: any;
  segmentData: any;
  productData: any;
  scnarioList: any = [];
  segmentKPIData: any;
  productKPIData: any;
  columnNames: any = [];
  filteredColumn: any = [];
  colNames: any = [];
  segmant: any;
  product: any;
  tooltipData: any = [];
  segmenttooltipData: any = [];
  producttooltipData: any = [];

  selectedGeoValue: any = null;
  selectedProductKpiValue: any = null;
  selectedByGeoPromoTypeKpiValue: any = null;
  impactByProductCategoryData: any = [];
  coopDropdownList: any = [];
  kpiValuesGeoPromoType: any = [];
  kpiValuesProduct: any = [];
  formattedProductArrOfObject: any = [];
  formattedGeoProTypeArrOfObject: any = [];



  //note
  impactNote: any
  geoPromoTypeScnarioList: any = [];
  byGeoPromoTypeData: any;
  byGeoPromoType: any;
  scenarioId: any;

  scenarioNameArr: any = [];

  public subscription: Subscription = new Subscription;

  @ViewChild('scenCompByGeo') scenCompByGeo = new MatSort(); 
  @ViewChild('scenCompByProdCat') scenCompByProdCat = new MatSort();
  constructor(private util: UtilService,
    private translate: TranslateService,
    public constantService: ConstantService,
    public dialog: MatDialog,
    private scenarioComparisonService: ScenarioComparisionService,
    private offerRecommenderService: OfferRecommenderService) { }

  ngOnInit(): void {
    this.selectedSegment = constant.login_page.kpichange;
    this.APIcalls();
  }

  APIcalls() {
    this.initialLanguageCall();
    this.configMaster();
    this.productCategoryApiCall();
    this.byGeoPromotypeAPiCall()
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

 
  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.impactNote = response.data.discount_result_impact_note;
    }, (error) => { })
  }

  /** validate Key exist */
  validateKeyIsExists(key: any) {
    if (this.util.isNullOrEmptyOrUndefined(key)) {
      return false;
    }
    return true;
  }

  //------------------------------------------------------- For USA Region -----------------------------------------------------------//

  // To get Scenario Id

  getScenarioId() {
    this.subscription.add(this.scenarioComparisonService.getScenarioId().subscribe((val: any) => {
      this.scenarioId = val;
      // console.log("Scenario Id =", this.scenarioId);

    }, (error) => {

    })
    )
  }

  //Api cal to get product

  productCategoryApiCall() {
    this.getScenarioId();

    this.scenarioComparisonService.getProductDetail(this.scenarioId).subscribe((response: any) => {
      let res = response;
      // let res = constant.scenarioComapreByProductCategory;
      if (res.http_code == constant.login_page.reponseCode) {
        this.scnarioList = res.data.scenario_list;
        this.productData = res.data.data;
        this.toDisplayColumnsHeaderOfProduct();

      }
    }, (error) => {

    })
  }

  // To Display Column Header of Product

  toDisplayColumnsHeaderOfProduct() {
    // To Display Coulmns Code Starts Here...

    let tempArr: any = [constant.scenario_planner.sno, constant.scenario_planner.product]
    this.kpiValuesProduct = constant.scenario_planner.kpiValuesProduct

    this.scnarioList.forEach((ele: any) => {
      this.scenarioNameArr.push(ele.scenario_name);
    })
    // console.log("Scenario Name:", this.scenarioNameArr);

    this.displayedColumnsproduct = [...tempArr, ...this.scenarioNameArr]
    // console.log("Display Columns", this.displayedColumnsproduct);

    this.productData.forEach((val: any) => {
      this.coopDropdownList.push(val.coop_name)
    })
    // console.log("Geo List", this.coopDropdownList);

    this.selectedGeoValue = this.coopDropdownList[0]
    this.selectedProductKpiValue = this.kpiValuesProduct[0]
    this.scenarioComparisonByProductCategoryTable(this.selectedProductKpiValue)
    // To Display Coulmns Code Ends Here...  
  }

  //Geo Change event
  productGeoChangeEvent(e: any) {
    this.selectedGeoValue = e;
    this.formattedProductArrOfObject = []
    this.product = [];
    this.dataSourceProduct = new MatTableDataSource(this.product);
    this.scenarioComparisonByProductCategoryTable(this.selectedProductKpiValue);
  }

  //Product KPI Change
  productKpiChangeEvent(event: any) {
    this.formattedProductArrOfObject = [];
    this.selectedProductKpiValue = event;
    this.product = [];
    this.dataSourceProduct = new MatTableDataSource(this.product);
    this.scenarioComparisonByProductCategoryTable(this.selectedProductKpiValue);
  }



  scenarioComparisonByProductCategoryTable(val: any) {

    // To Display Coulmns Data Code Starts Here...
    let tempVal: any;
    let tempData: any = {};
    let data: any;
    let sceArr: any = [];
    for (let i = 0; i < this.productData.length; i++) {
      if (this.productData[i].coop_name == this.selectedGeoValue) {
        switch (val) {

          case 'Sales':
            tempVal = this.productData[i].sales;
            break;

          case 'Gross Margin $':
            tempVal = this.productData[i].gp;
            break;

          case 'UPT':
            tempVal = this.productData[i].upt;
            break;

          case 'URW':
            tempVal = this.productData[i].urw;
            break;

          default:
            break;

        }

        if (tempVal.length > 0) {
          for (let j = 0; j < tempVal.length; j++) {
            let key: any = tempVal
            tempData = {}
            tempData[constant.scenario_planner.sno] = j + 1;
            tempData[constant.scenario_planner.product] = key[j].product_name
            sceArr = []

            for (let k = 0; k < tempVal[j].kpi_details.length; k++) {
              if (tempVal[j].product_name == key[j].product_name) {
                data = Object.keys(tempVal[j].kpi_details[k])
                sceArr.push(data[0]);
                if (this.scenarioNameArr.includes(data[0])) {
                  tempData[data[0]] = {
                    "scenario_id": tempVal[j].kpi_details[k][data[0]].scenario_id,
                    "lift": tempVal[j].kpi_details[k][data[0]].lift,
                    "scenario_value": Math.round(tempVal[j].kpi_details[k][data[0]].scenario_value),
                  }
                }
              }

            }

            if (this.scenarioNameArr.length > sceArr.length) {
              this.comparingArrays(tempData, sceArr, 'productCatFlag');
            }

            this.formattedProductArrOfObject.push(tempData)
            // console.log("Formatted Array", formattedArrofObject);

          }

        }
      }
      this.product = this.formattedProductArrOfObject;
      this.dataSourceProduct = new MatTableDataSource(this.product);
      this.dataSourceProduct.sort = this.scenCompByProdCat
      // To Display Coulmns Data Code Ends Here...
    }
  }

  // API Call for By Geo;Promo Type

  byGeoPromotypeAPiCall() {


    this.getScenarioId();

    this.scenarioComparisonService.getGeoPromoTypeDetail(this.scenarioId).subscribe((response: any) => {
      let res = response;
      // let res = constant.scenarioComapreByGeoPromoType.data

      if (res.http_code == constant.login_page.reponseCode) {
        this.byGeoPromoTypeData = res.data;
        this.toDisplayColumnsHeaderOfGeoPromoType();

      }
    }, (error) => {

    });


  }

  // To Display Column Header of Geo;Promo Type

  toDisplayColumnsHeaderOfGeoPromoType() {
    // To Display Coulmns Code Starts Here...
    let tempArr: any = [constant.scenario_planner.sno, constant.scenario_planner.geo, constant.scenario_planner.promoType]

    this.byGeoPromoTypeData.scenarios_list.forEach((ele: any) => {
      this.geoPromoTypeScnarioList.push(ele.scenario_name);
    })

    this.kpiValuesGeoPromoType = constant.scenario_planner.kpiValuesGeoPromoType
    this.selectedByGeoPromoTypeKpiValue = this.kpiValuesGeoPromoType[0]
    this.scenarioComparisonByGeoPromoTypeTable(this.selectedByGeoPromoTypeKpiValue);


    // console.log("Scenario Name:", scenarioByGeoPromoArr);

    this.displayedColumnsByGeoPromoType = [...tempArr, ...this.geoPromoTypeScnarioList]
    // console.log("Display Columns", this.displayedColumnsByGeoPromoType);

    // To Display Coulmns Code Ends Here...  
  }


  //kpi change event for Geo;Promo Type

  kpiChangeEventByGeoPromoType(evnt: any) {
    this.formattedGeoProTypeArrOfObject = [];
    this.selectedByGeoPromoTypeKpiValue = evnt
    this.scenarioComparisonByGeoPromoTypeTable(this.selectedByGeoPromoTypeKpiValue);
  }

  scenarioComparisonByGeoPromoTypeTable(value: any) {

    // To Display Coulmns Data Code Starts Here...
    let tempValue: any;
    let tempData: any = {};
    let sceArr: any = [];

    switch (value) {
      case "GC":
        tempValue = this.byGeoPromoTypeData.gc
        break;
      case "Sales":
        tempValue = this.byGeoPromoTypeData.sales
        break;
      case "Gross Margin $":
        tempValue = this.byGeoPromoTypeData.gp
        break;
      case "Average Check":
        tempValue = this.byGeoPromoTypeData.acv
        break;
      case "UPT":
        tempValue = this.byGeoPromoTypeData.upt
        break;
      case "URW":
        tempValue = this.byGeoPromoTypeData.urw
        break;
    }

    if (tempValue.length > 0) {
      for (let j = 0; j < tempValue.length; j++) {
        let key: any = tempValue

        tempData = {}
        tempData[constant.scenario_planner.sno] = j + 1;
        tempData[constant.scenario_planner.geo] = key[j].coop_name
        tempData[constant.scenario_planner.promoType] = key[j].promo_type
        sceArr = []
        for (let k = 0; k < tempValue[j].kpi_details.length; k++) {
          if (tempValue[j].coop_name == key[j].coop_name) {
            var data = Object.keys(tempValue[j].kpi_details[k])
            sceArr.push(data[0]);
            if (this.geoPromoTypeScnarioList.includes(data[0])) {
              if (value == "GC" || value == "Sales" || value == "Gross Margin" || value == "UPT" || value == "URW") {
                tempData[data[0]] = {
                  "scenario_id": tempValue[j].kpi_details[k][data[0]].scenario_id,
                  "lift": tempValue[j].kpi_details[k][data[0]].lift,
                  "scenario_value": Math.round(tempValue[j].kpi_details[k][data[0]].scenario_value),
                }
              } else {
                tempData[data[0]] = {
                  "scenario_id": tempValue[j].kpi_details[k][data[0]].scenario_id,
                  "lift": tempValue[j].kpi_details[k][data[0]].lift,
                  "scenario_value": parseFloat((+tempValue[j].kpi_details[k][data[0]].scenario_value).toFixed(1)),
                }
              }
            }
          }

        }

        // console.log("sceArr", sceArr);

        if (this.geoPromoTypeScnarioList.length > sceArr.length) {
          if (value == "GC" || value == "Sales" || value == "Gross Margin" || value == "UPT" || value == "URW") {
            this.comparingArrays(tempData, sceArr, 'geoPromoTypeFlag')
          } else {
            this.comparingArrays(tempData, sceArr, 'geoPromoTypeFlag')
          }


        }
        // console.log(tempData);
        this.formattedGeoProTypeArrOfObject.push(tempData)

      }
      // console.log("Formatted Array", this.formattedGeoProTypeArrOfObject);

      this.byGeoPromoType = this.formattedGeoProTypeArrOfObject;
      this.dataSourceGeoPromoType = new MatTableDataSource(this.byGeoPromoType);
      this.dataSourceGeoPromoType.sort = this.scenCompByGeo
      // To Display Coulmns Data Code Ends Here...
    }
  }
  //------------------------------------------------------- For USA Region -----------------------------------------------------------//

  comparingArrays(tempData: any, sceArr: any, identifier: string) {
    let val: any;

    switch (identifier) {
      case 'geoPromoTypeFlag':
        val = this.geoPromoTypeScnarioList
        break;

      case 'productCatFlag':
        val = this.scenarioNameArr
        break;
    }
    for (let x = 0; x < val.length; x++) {

      if (sceArr.includes(val[x])) {
        // console.log("True");

      } else {
        tempData[val[x]] = {
          "scenario_id": "NA",
          "lift": "NA",
          "scenario_value": "NA"
        }
      }

    }
  }
}
