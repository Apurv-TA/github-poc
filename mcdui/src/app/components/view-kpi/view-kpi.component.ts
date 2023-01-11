import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConstantService } from 'src/app/services/constant.service';
import * as constant from '../../shared/constant/constant';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilService } from 'src/app/services/util.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-kpi',
  templateUrl: './view-kpi.component.html',
  styleUrls: ['./view-kpi.component.scss']
})
export class ViewKpiComponent implements OnInit {

  /**Table variables  */
  displayedKPIColumns: string[] = constant.issueTracker.displayedKPIColumns;
  selectedLanguage: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  dataSource!: MatTableDataSource<any>;
  kpiDefinition: any;

  constructor(public translate: TranslateService, public constantService: ConstantService,
    private router: Router,
    private utils: UtilService,
    public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.initialLanguageCall();
    setTimeout(() => {
      this.kpiData();
    }, 100);
  }

  /** Language Translation */
  initialLanguageCall() {
    this.translate.addLangs([constant.login_page.English, constant.login_page.Russia])
    this.selectedLanguage = this.constantService.getLanguage();
    if (this.selectedLanguage) {
      this.translate.setDefaultLang(this.selectedLanguage);
      this.translate.use(this.selectedLanguage);
    } else { }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /** KPI Definition Data */
  kpiData() {
    this.kpiDefinition = [
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.guestCount), formula: this.utils.languageTranslator(constant.issueTracker.guestCountFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.userCount), formula: this.utils.languageTranslator(constant.issueTracker.userCountFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.netSales), formula: this.utils.languageTranslator(constant.issueTracker.netSalesFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.grossProfit), formula: this.utils.languageTranslator(constant.issueTracker.grossProfitFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.avgCheck), formula: this.utils.languageTranslator(constant.issueTracker.avgCheckFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.effectMargin), formula: this.utils.languageTranslator(constant.issueTracker.effectMarginFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.upt), formula: this.utils.languageTranslator(constant.issueTracker.uptFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.urw), formula: this.utils.languageTranslator(constant.issueTracker.urwFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.discountUsage), formula: this.utils.languageTranslator(constant.issueTracker.discountUsageFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.discountUsagePromo), formula: this.utils.languageTranslator(constant.issueTracker.discountUsagePromoFormula) },
      { si_no: "", kpi_name: this.utils.languageTranslator(constant.issueTracker.impactIndex), formula: this.utils.languageTranslator(constant.issueTracker.imapctIndexFormula) }
    ];
    this.initialDataCall(this.kpiDefinition);
  }

  /** Initial Data Call */
  initialDataCall(kpiDefinition: any) {
    this.dataSource = new MatTableDataSource(kpiDefinition);
  }
}
