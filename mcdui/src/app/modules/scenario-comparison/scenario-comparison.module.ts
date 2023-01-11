/* Angular Pre-Defined Components */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Shared modules */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';


/** user defined components */
import { ScenarioSelectionComponent } from '../../components/scenario-selection/scenario-selection.component';
import { ScenarioComparisionDetailComponent } from '../../components/scenario-comparision-detail/scenario-comparision-detail.component';
import { ScenarioComparisionTableComponent } from 'src/app/components/scenario-comparision-table/scenario-comparision-table.component';
import { ScenarioComparisionGraphComponent } from 'src/app/components/scenario-comparision-graph/scenario-comparision-graph.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ScenarioSelectionComponent, data: { title: 'Scenario Selection' } },
  { path: 'scenario-comparision', pathMatch: 'full', component: ScenarioComparisionDetailComponent, data: { title: 'Scenario Comparision' } },

];


@NgModule({
  declarations: [
    ScenarioSelectionComponent,
    ScenarioComparisionDetailComponent,
    ScenarioComparisionTableComponent,
    ScenarioComparisionGraphComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
  ]
})
export class ScenarioComparisonModule { }
