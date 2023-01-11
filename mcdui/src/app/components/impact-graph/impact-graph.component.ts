import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { PackageSummaryService } from 'src/app/services/package-summary.service';
import { RecommendedImpactService } from 'src/app/services/recommended-impact.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-impact-graph',
  templateUrl: './impact-graph.component.html',
  styleUrls: ['./impact-graph.component.scss']
})
export class ImpactGraphComponent implements OnInit, OnDestroy {
  @Input() graphData: any;
  @Input() setHeight: any


  chartOptions: any
  getHeight: any
  package_id: any;
  impactByProductCategoryData: any = [];
  coopDropdownList: any = [];
  productCategoryList: any = [];
  selectedGeoValue: any;
  salesData: any = [];
  uptData: any = [];
  urwData: any = [];
  gmData: any = [];
  impactByProductCategoryTableData: any = []
  scenarioId: any;
  // To Show Hide Graph
  showHideGraph: boolean = false;

  // Graph
  Highcharts: typeof Highcharts = Highcharts;
  linechart: any;

  // Behaviour subject Subscription
  public subscription: Subscription = new Subscription();

  constructor(public recommendedImpactService: RecommendedImpactService,
    public packageSummaryService: PackageSummaryService,
    public utilService: UtilService) { }

  ngOnInit(): void {
    this.chartOptions = this.graphData
    this.initialApiCall()
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

    this.recommendedImpactService.getImpactByProductCategory(this.scenarioId).subscribe((response: any) => {

      let res = response;
      // let res = constant.impactByProductCategory;
      this.impactByProductCategoryData = res.data.chart_data;
      this.geoDropDownList(this.impactByProductCategoryData);
    }, (error) => {

    });
  }

  geoDropDownList(data: any) {
    data.forEach((ele: any) => {
      if (!this.coopDropdownList.includes(ele.coop_name)) {
        this.coopDropdownList.push(ele.coop_name)
        // console.log(this.coopDropdownList.includes(ele.coop));
      }
    })
    this.selectedGeoValue = this.coopDropdownList[0];
    this.getProductCategories(this.selectedGeoValue);
  }

  //Geo Change event
  geoChangeEvent(event: any) {
    this.selectedGeoValue = event;
    this.getProductCategories(this.selectedGeoValue);
  }

  getProductCategories(e: any) {
    this.formattedResponse(e)
    // console.log(this.impactByProductCategoryTableData);

    this.productCategoryList = [];
    this.salesData = [];
    this.uptData = [];
    this.urwData = [];
    this.gmData = [];
    this.showHideGraph = true;
    this.impactByProductCategoryTableData.forEach((val: any) => {
      if (e == val.coop_name) {
        if ((val.metric_type.lift.sales != 'NA' ||
          val.metric_type.lift.upt != 'NA' ||
          val.metric_type.lift.urw != 'NA' ||
          val.metric_type.lift.gm != 'NA') && (val.metric_type.lift.sales != null ||
            val.metric_type.lift.upt != null ||
            val.metric_type.lift.urw != null ||
            val.metric_type.lift.gm != null)) {
          this.productCategoryList.push(val.granularity_value);
          this.salesData.push(parseFloat(val.metric_type.lift.sales.toFixed(2)));
          this.uptData.push(parseFloat(val.metric_type.lift.upt.toFixed(2)));
          this.urwData.push(parseFloat(val.metric_type.lift.urw.toFixed(2)));
          this.gmData.push(parseFloat(val.metric_type.lift.gm.toFixed(2)));

        }
      }
    })

    // console.log("Product Categories", this.productCategoryList);
    // console.log("Sales", this.salesData);
    // console.log("UPT array", this.uptData);
    // console.log("URW array", this.urwData);

    this.linechart = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'By Product Category - Lift %',
        align: 'left'
      },
      xAxis: {
        categories: this.productCategoryList,
        crosshair: true
      },
      yAxis: {
        title: {
          text: '',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 210,
        itemMarginTop: 12

      },

      series: [
        {
          name: 'Sales',
          data: this.salesData,
          color: '#FF6702'

        },
        {
          name: 'URW',
          data: this.urwData,
          color: '#0121E5'
        },
        {
          name: 'UPT',
          data: this.uptData,
          color: '#E50101'

        },
        {
          name: 'Gross Margin $',
          data: this.gmData,
          color: '#F8C914'

        },
      ]
    };
  }

  formattedResponse(event: any) {
    let tmpData = {};

    for (let i = 0; i < this.impactByProductCategoryData.length; i++) {
      var data = Object.keys(this.impactByProductCategoryData[i].metric_type)
      // console.log(data);

      if (event == this.impactByProductCategoryData[i].coop_name) {
        if (data.length != 0) {
          tmpData = {
            "coop_name": this.impactByProductCategoryData[i].coop_name,
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

          this.impactByProductCategoryTableData.push(tmpData)

        }
      }
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}


