/* Angular Pre-Defined Components */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Shared modules */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
/** user defined components */

import { ScenarioPlannerResultsComponent } from '../../components/scenario-planner-results/scenario-planner-results.component';
import { ScenarioPlannerLandingComponent } from '../../components/scenario-planner-landing/scenario-planner-landing.component';
import { ImportRecommenderComponent } from '../../components/import-recommender/import-recommender.component';

import { ScenarioNameComponent } from '../../components/scenario-name/scenario-name.component';
import { ScenarioImpactGraphComponent } from '../../components/scenario-impact-graph/scenario-impact-graph.component';
import { ScenarioImpactBysegmentComponent } from '../../components/scenario-impact-bysegment/scenario-impact-bysegment.component';
import { ScenarioImpactByproductComponent } from '../../components/scenario-impact-byproduct/scenario-impact-byproduct.component';
import { ScenarioDetailImpactComponent } from '../../components/scenario-detail-impact/scenario-detail-impact.component';


const routes: Routes = [

  { path: '', pathMatch: 'full', component: ScenarioPlannerLandingComponent, data: { title: 'Scenario Planner Landing' } },
  { path: 'scenario-results/:offerId', pathMatch: 'full', component: ScenarioPlannerResultsComponent, data: { title: 'Scenario Results' } },
  { path: 'scenario-name', pathMatch: 'full', component: ScenarioNameComponent, data: { title: 'Scenario Name' } },
  { path: 'scenario-name/:offerId', pathMatch: 'full', component: ScenarioNameComponent, data: { title: 'Scenario Name' } },
  { path: 'scenario-name/:type/:offerId', pathMatch: 'full', component: ScenarioNameComponent, data: { title: 'Scenario Name' } },
  { path: 'scenario-name/:type/:offerId', pathMatch: 'full', component: ScenarioNameComponent, data: { title: 'Scenario Name' } },
  { path: 'import-recommender', pathMatch: 'full', component: ImportRecommenderComponent, data: { title: 'Import Recommender' } },
  { path: 'scenario-impact/:offerId', pathMatch: 'full', component: ScenarioDetailImpactComponent, data: { title: 'Scenario Impact' } },

];



@NgModule({
  declarations: [
    ScenarioPlannerLandingComponent,
    ImportRecommenderComponent,
    ScenarioPlannerResultsComponent,
    ScenarioNameComponent,
    ScenarioImpactGraphComponent,
    ScenarioImpactBysegmentComponent,
    ScenarioImpactByproductComponent,
    ScenarioDetailImpactComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ]
})
export class ScenarioPlannerModule { }
