import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as constant from '../../shared/constant/constant';
@Component({
  selector: 'app-scenario-impact-graph',
  templateUrl: './scenario-impact-graph.component.html',
  styleUrls: ['./scenario-impact-graph.component.scss']
})
export class ScenarioImpactGraphComponent implements OnInit {
  @Input() graphData: any;
  Highcharts: typeof Highcharts = Highcharts;
  styleHeight: any = constant.login_page.setHeightInPx
  chartOptions: any

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = this.graphData
  }
}
