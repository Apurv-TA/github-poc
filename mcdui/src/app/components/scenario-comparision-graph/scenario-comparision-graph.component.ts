import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { constants } from 'buffer';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/services/constant.service';
import { ScenarioComparisionService } from 'src/app/services/scenario-comparision.service';
import { UtilService } from 'src/app/services/util.service';
import * as constant from '../../shared/constant/constant';
@Component({
  selector: 'app-scenario-comparision-graph',
  templateUrl: './scenario-comparision-graph.component.html',
  styleUrls: ['./scenario-comparision-graph.component.scss']
})
export class ScenarioComparisionGraphComponent implements OnInit, OnDestroy {
  //Intializing values

  selectedLanguage: any
  productListDropdown: any = []
  selectedProduct: any
  scenarioId: any
  styleHeight: any = constant.login_page.setHeightInPert

  geoSeriesArr: any = [];
  productCatSeriesArr: any = [];
  selectedByGeoPromoTypeKpiValue: any = '';
  selectedGeoValue: any = '';
  selectedProductKpiValue: any = '';
  kpiValuesGeoPromoType: any = [];
  kpiValuesProduct: any = [];

  productData: any = [];
  coopDropdownList: any = [];
  showHideGraph: boolean = false;

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  coopNameArr: any = []

  byGeoPromoTypeData: any = [];

  geoPromoTypeOptions: any;
  productCategoryOptions: any;

  /** for storing a product categories to show in the graph */
  productCat: any = [];

  public subscription: Subscription = new Subscription

  constructor(public translate: TranslateService,
    public constantService: ConstantService,
    public scenarioComparisionService: ScenarioComparisionService,
    public utilService: UtilService,
    public scenarioComparisonService: ScenarioComparisionService
  ) { }

  ngOnInit(): void {
    this.scenarioId = sessionStorage.getItem(constant.login_page.scenario_id)
    this.initialLanguageCall()
    this.graphDataApiLoader()

  }

  //Language set
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  graphDataApiLoader() {
    this.byGeoPromotypeAPiCall()
    this.productCategoryApiCall()
  }



  getScenarioId() {
    this.subscription.add(this.scenarioComparisonService.getScenarioId().subscribe((val: any) => {
      this.scenarioId = val;
      // console.log("Scenario Id =", this.scenarioId);

    }, (error) => {

    })
    )
  }

  // API Call for By Geo;Promo Type

  byGeoPromotypeAPiCall() {
    this.getScenarioId()
    this.scenarioComparisonService.getGeoPromoTypeGraphData(this.scenarioId).subscribe((response: any) => {
      let res = response;
      this.byGeoPromoTypeData = [];
      this.coopNameArr = [];
      this.kpiValuesGeoPromoType = [];

      // let res = constant.scenarioComapreByGeoPromoType.data
      if (res.http_code == constant.login_page.reponseCode) {
        this.byGeoPromoTypeData = res.data;
        this.coopNameArr = res.data.geo_list;
        this.kpiValuesGeoPromoType = this.byGeoPromoTypeData.kpi_list
        this.selectedByGeoPromoTypeKpiValue = this.kpiValuesGeoPromoType[0]
        this.scenarioComparisonByGeoPromoTypeGraph(this.selectedByGeoPromoTypeKpiValue);
        // console.log("geo Promo Data", this.byGeoPromoTypeData);


      }
    }, (error) => {

    });
  }

  //kpi change event for Geo;Promo Type

  kpiChangeEventByGeoPromoType(evnt: any) {

    constant.byGeoPromoTypeGraph.xAxis.categories = [];
    constant.byGeoPromoTypeGraph.series = [];
    this.geoPromoTypeOptions = {};
    this.selectedByGeoPromoTypeKpiValue = evnt
    if (evnt === this.kpiValuesGeoPromoType[0]) {
      this.byGeoPromotypeAPiCall()
    } else {
      this.scenarioComparisonByGeoPromoTypeGraph(this.selectedByGeoPromoTypeKpiValue);
    }

  }

  scenarioComparisonByGeoPromoTypeGraph(value: any) {
    this.showHideGraph = true;
    let tempValue: any;

    this.geoSeriesArr = [];

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
      default:
        break;
    }

    if (tempValue.length > 0) {
      for (let j = 0; j < tempValue.length; j++) {

        if (j == 0) {

          this.geoSeriesArr.push({
            showInLegend: tempValue[j].scenario_name != '' ? true : false,
            "name": tempValue[j].scenario_name,
            "data": tempValue[j].val,
            color: '#2A4A64'
          })

        } else if (j == 1) {
          this.geoSeriesArr.push({
            showInLegend: tempValue[j].scenario_name != '' ? true : false,
            "name": tempValue[j].scenario_name,
            "data": tempValue[j].val,
            color: '#0265AD'
          })

        } else if (j == 2) {
          this.geoSeriesArr.push({
            showInLegend: tempValue[j].scenario_name != '' ? true : false,
            "name": tempValue[j].scenario_name,
            "data": tempValue[j].val,
            color: '#09918B'
          })

        } else if (j == 3) {

          this.geoSeriesArr.push({
            showInLegend: tempValue[j].scenario_name != '' ? true : false,
            "name": tempValue[j].scenario_name,
            "data": tempValue[j].val,
            color: '#E50101'
          })

        } else if (j == 4) {
          this.geoSeriesArr.push({
            showInLegend: tempValue[j].scenario_name != '' ? true : false,
            "name": tempValue[j].scenario_name,
            "data": tempValue[j].val,
            color: '#FF8B00'
          })

        }
      }

    }

    this.updateFlag = true
    this.geoPromoGraph();
  }

  geoPromoGraph() {
    constant.byGeoPromoTypeGraph.xAxis.categories = this.coopNameArr;
    constant.byGeoPromoTypeGraph.series = this.geoSeriesArr
    this.geoPromoTypeOptions = constant.byGeoPromoTypeGraph
  }


  //Api cal to get product

  productCategoryApiCall() {
    this.getScenarioId();
    this.scenarioComparisionService.getProductGraphData(this.scenarioId).subscribe((response: any) => {
      // let res = constant.dummyTestData;
      let res = response;
      this.productData = [];
      this.coopDropdownList = [];
      this.productCat = [];
      this.kpiValuesProduct = [];

      if (res.http_code == constant.login_page.reponseCode) {
        this.productData = res.data.data_list;
        // console.log("Product Data", this.productData);
        this.coopDropdownList = res.data.geo_list
        this.productCat = res.data.product_list;
        this.kpiValuesProduct = res.data.kpi_list
        this.selectedGeoValue = this.coopDropdownList[0]
        this.selectedProductKpiValue = this.kpiValuesProduct[0]
        this.scenarioComparisonByProductCategoryTable(this.selectedProductKpiValue)

      }
    }, (error) => {

    });

  }

  //Product Geo Change event
  productGeoChangeEvent(e: any) {
    this.selectedGeoValue = e;
    // this.productCatSeriesArr = []
    if (e === this.coopDropdownList[0] && this.selectedProductKpiValue === this.kpiValuesProduct[0]) {
      this.productCategoryApiCall();
    } else {
      this.scenarioComparisonByProductCategoryTable(this.selectedProductKpiValue);

    }
  }

  //Product KPI Change
  productKpiChangeEvent(event: any) {
    // this.selectedProductKpiValue = '';
    constant.byProductCategoryGraph.xAxis.categories = [];
    constant.byProductCategoryGraph.series = [];
    this.productCategoryOptions = {}
    this.selectedProductKpiValue = event;
    if (event === this.kpiValuesProduct[0] && this.selectedGeoValue === this.coopDropdownList[0]) {
      this.productCategoryApiCall();
    } else {
      this.scenarioComparisonByProductCategoryTable(this.selectedProductKpiValue);

    }
  }

  scenarioComparisonByProductCategoryTable(element: any) {

    let tempVal: any;
    this.showHideGraph = true;
    this.productCatSeriesArr = [];

    for (let j = 0; j < this.productData.length; j++) {

      if (this.productData[j].coop_name == this.selectedGeoValue) {
        switch (element) {

          case 'Sales':
            tempVal = this.productData[j].sales;
            break;

          case 'Gross Margin $':
            tempVal = this.productData[j].gp;
            break;

          case 'UPT':
            tempVal = this.productData[j].upt;
            break;

          case 'URW':
            tempVal = this.productData[j].urw;
            break;

          default:
            break;

        }

        for (let i = 0; i < tempVal.length; i++) {
          if (i == 0) {
            this.productCatSeriesArr.push({
              showInLegend: tempVal[i].scenario_name != '' ? true : false,
              "name": tempVal[i].scenario_name,
              "data": tempVal[i].val,
              color: '#2A4A64'
            },)

          } else if (i == 1) {
            this.productCatSeriesArr.push({
              showInLegend: tempVal[i].scenario_name != '' ? true : false,
              "name": tempVal[i].scenario_name,
              "data": tempVal[i].val,
              color: '#0265AD'
            },)

          } else if (i == 2) {
            this.productCatSeriesArr.push({
              showInLegend: tempVal[i].scenario_name != '' ? true : false,
              "name": tempVal[i].scenario_name,
              "data": tempVal[i].val,
              color: '#09918B'
            },)

          } else if (i == 3) {
            this.productCatSeriesArr.push({
              showInLegend: tempVal[i].scenario_name != '' ? true : false,
              "name": tempVal[i].scenario_name,
              "data": tempVal[i].val,
              color: '#E50101'
            },)

          } else if (i == 4) {
            this.productCatSeriesArr.push({
              showInLegend: tempVal[i].scenario_name != '' ? true : false,
              "name": tempVal[i].scenario_name,
              "data": tempVal[i].val,
              color: '#FF8B00'
            },)

          }
        }
      }

    }
    this.updateFlag = true
    this.prodGraph();
  }

  prodGraph() {

    constant.byProductCategoryGraph.xAxis.categories = this.productCat;
    constant.byProductCategoryGraph.series = this.productCatSeriesArr
    this.productCategoryOptions = constant.byProductCategoryGraph

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
