/** Angular Module */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


/* Third Party Components */
import { NgxPaginationModule } from 'ngx-pagination'
import { JwPaginationModule } from 'jw-angular-pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImpactGraphComponent } from 'src/app/components/impact-graph/impact-graph.component';
import { DatePipeCustom } from 'src/app/shared/pipe/date-pipe-custom';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CurrencyFormat } from 'src/app/shared/pipe/currency-format';
import { TrimPipe } from './../../shared/pipe/trim-pipe';
import { RoundPipe } from './../../shared/pipe/round-pipe';
import { NumbersDisplayPipe } from 'src/app/shared/pipe/numbers-display-pipe';
import { RecommenderDiscountImpactIndexComponent } from 'src/app/components/recommender-discount-impact-index/recommender-discount-impact-index.component';
import { MaterialModule } from '../material/material.module';
import { ScenarioPlannerDiscountComponent } from 'src/app/components/scenario-planner-discount/scenario-planner-discount.component';
import { ScenarioImpactTableComponent } from 'src/app/components/scenario-impact-table/scenario-impact-table.component';
import { ProductCategoryComponent } from 'src/app/components/product-category/product-category.component';

let config = JSON.parse(localStorage.getItem('configuration') || '{ "date_format": "" }');

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: config?.date_format?.toUpperCase() || 'MM-DD-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HighchartsChartModule,
    NgSelectModule,
    NgbModule,
    AngularMultiSelectModule,
    JwPaginationModule,
    BsDropdownModule.forRoot(),
    TranslateModule,
    NgxSliderModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HighchartsChartModule,
    NgSelectModule,
    NgxSliderModule,
    NgbModule,
    AngularMultiSelectModule,
    JwPaginationModule,
    BsDropdownModule,
    TranslateModule,
    ImpactGraphComponent,
    DatePipeCustom,
    CurrencyFormat,
    TrimPipe,
    RoundPipe,
    NumbersDisplayPipe,
    RecommenderDiscountImpactIndexComponent,
    ScenarioPlannerDiscountComponent,
    ScenarioImpactTableComponent,
    ProductCategoryComponent
  ],
  declarations: [ImpactGraphComponent, DatePipeCustom, CurrencyFormat, TrimPipe,NumbersDisplayPipe,
    RoundPipe, RecommenderDiscountImpactIndexComponent, ScenarioPlannerDiscountComponent,
    ScenarioImpactTableComponent, ProductCategoryComponent],
  providers: [TranslateService,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }