import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import * as constant from '../../shared/constant/constant';
import { ConstantService } from '../../services/constant.service';
import { RecommendedImpactService } from '../../services/recommended-impact.service';
import { UtilService } from 'src/app/services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { OfferRecommenderService } from 'src/app/services/offer-recommender.service';
import { KeyValue } from '@angular/common';
import { Subscription } from 'rxjs';
import { PackageSummaryService } from 'src/app/services/package-summary.service';

export interface PeriodicElement {
  serial_no: number,
  product_category: string,
  gp_change: number,
  net_sales: number,
  effect_margin: number,
  upt_change: number
}

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnDestroy {

  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }



  /**Coop dropdown variable */
  
  offerConfigId: any
  coopDropdownList: any = [];
  /**Table  */
  displayedColumns: string[] = constant.productCatgoryData.displayColumns;
  selectedLanguage: any;
  from_page: any
  tabledata:any;

  impactByProductCategoryData: any = [];
  // @ViewChild(MatSort) sort: MatSort = new MatSort;
  @ViewChild('table1', { read: MatSort, static: true }) sort: MatSort = new MatSort;
  @ViewChild('table2', { read: MatSort, static: true }) sort1: MatSort = new MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  scenarioTableShow: boolean = false;
  getSelectedConfigId: any
  previouSelectedValue: any = []
  package_id: any;
  //setCurrency
  currencyCode: any

  selectedKpiValue: any
  selectedGeoValue: any = "Select";
  impactNote: any

  scenarioId: any;
  // To Showhide Table Data
  showHideTable: boolean = false;

  kpi_list=['lift','lift_value','scenario_value','base_value']
  


  // Behaviour subject Subscription
  public subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService,
    public constantService: ConstantService,
    private route: ActivatedRoute,
    public utilService: UtilService,
    public offerRecommenderService: OfferRecommenderService,
    public recommendedImpactService: RecommendedImpactService,
    public packageSummaryService: PackageSummaryService) {
    this.route.queryParamMap.subscribe(resp => {
      this.from_page = resp.get('from_page')
    })
  }

  dataSource!: MatTableDataSource<any>;
  dataSource1!:MatTableDataSource<any>;

  ngOnInit(): void {
    this.offerConfigId = sessionStorage.getItem(constant.login_page.offerConfigId)
    this.initialLanguageCall();
    this.initialApiCall();
    this.configMaster()
    
  }

  ngAfterViewInit (){
    const sortState:Sort = {
      active: 'granularity_value', direction: 'desc'
    }
    this.dataSource.sort = this.sort;
    this.dataSource1.sort=this.sort1;
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.sort1.active = sortState.active;
    this.sort1.direction = sortState.direction;
    this.sort1.sortChange.emit(sortState);
  }
  /** Get Config Master */
  configMaster() {
    this.offerRecommenderService.getCongigurationService().subscribe((response: any) => {
      this.impactNote = response.data.discount_result_impact_note;
    }, (error) => { })
  }
  initialLanguageCall() {

    this.currencyCode = sessionStorage.getItem(constant.login_page.currencyCode)
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage)
      this.translate.use(this.selectedLanguage)
    } else { }
  }

  //kpi change event
  kpiChangeEvent(event: any) {
    // console.log("called kpi change event",event);
    this.selectedKpiValue = event
    this.dataSource1=new MatTableDataSource(this.tabledata[this.selectedGeoValue][this.kpi_list[this.selectedKpiValue-1]]);
  }
  
  sortData1(sort:Sort){
    console.log("called sort1");
  this.dataSource1.sort=this.sort1;}
  //Geo Change event
  geoChangeEvent(event: any) {
    // console.log("called");
    this.selectedGeoValue = event;
    this.impactByProductCategoryTable(this.selectedGeoValue);
    this.dataSource1=new MatTableDataSource(this.tabledata[this.selectedGeoValue][this.kpi_list[this.selectedKpiValue-1]]);
  }

  getScenarioId() {

    this.subscription.add(this.packageSummaryService.getScenarioId().subscribe((val: any) => {
      this.scenarioId = val;
      // console.log("Scenario Id =", this.scenarioId);
    }, (error) => {

    })
    )
  }

  // Initial API Call
  initialApiCall() {

    this.getScenarioId();
    this.selectedKpiValue = constant.login_page.kpichange;

    this.recommendedImpactService.getImpactByProductCategory(this.scenarioId).subscribe((response: any) => {
      let res = response;
      // let res = constant.impactByProductCategory;
      this.impactByProductCategoryData = res.data.chart_data;
      // console.log("Before Modified", this.impactByProductCategoryData);

      this.geoDropDownList(this.impactByProductCategoryData);
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
      this.tabledata=res.data.tabledata;
      // console.log(this.selectedGeoValue,this.selectedKpiValue);
      this.dataSource1=new MatTableDataSource(this.tabledata[this.selectedGeoValue][this.kpi_list[this.selectedKpiValue-1]]);
      this.dataSource1.sort=this.sort1;
    }, (error) => {

    });
  }

  impactByProductCategoryTable(event: any) {
    let impactByProductCategoryTableData: any = [];
    let tmpData: any = {};
    this.showHideTable = true;

    
    for (let i = 0; i < this.impactByProductCategoryData.length; i++) {
      var data = Object.keys(this.impactByProductCategoryData[i].metric_type)
      // console.log(data);

      if (event == this.impactByProductCategoryData[i].coop_name) {
        if (data.length != 0) {
          tmpData = {
            //** If Backend not provide proper response then we are handeling on the front end by modifying response */

            "granularity_value": this.impactByProductCategoryData[i].granularity_value,
            "metric_type": {
              "base_value": {
                "sales": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.base_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.base_value.sales,
                "urw": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.base_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.base_value.urw,
                "upt": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.base_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.base_value.upt,
                "gm": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.base_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.base_value.gp
              },
              "lift": {
                "sales": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift.sales,
                "urw": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift.urw,
                "upt": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift.upt,
                "gm": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift.gp

              },
              "lift_value": {
                "sales": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift_value.sales,
                "urw": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift_value.urw,
                "upt": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift_value.upt,
                "gm": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.lift_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.lift_value.gp

              },
              "scenario_value": {
                "sales": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.scenario_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.scenario_value.sales,
                "urw": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.scenario_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.scenario_value.urw,
                "upt": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.scenario_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.scenario_value.upt,
                "gm": this.utilService.isNullOrEmptyOrUndefined(this.impactByProductCategoryData[i].metric_type.scenario_value) ? 'NA' : this.impactByProductCategoryData[i].metric_type.scenario_value.gp

              }
            }
          }


          impactByProductCategoryTableData.push(tmpData)

        }
      }
    }
    // console.log(impactByProductCategoryTableData);

    this.dataSource = new MatTableDataSource(impactByProductCategoryTableData);
  }

  geoDropDownList(data: any) {
    data.forEach((ele: any) => {
      if (!this.coopDropdownList.includes(ele.coop_name)) {
        this.coopDropdownList.push(ele.coop_name)
        // console.log(this.coopDropdownList.includes(ele.coop));
      }
    })
    this.selectedGeoValue = this.coopDropdownList[0]
    this.impactByProductCategoryTable(this.selectedGeoValue)
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}

