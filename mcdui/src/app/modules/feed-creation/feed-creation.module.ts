/* Angular Pre-Defined Components */
import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Shared modules */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';

/** user defined components */
import { FeedSelectionComponent } from '../../components/feed-selection/feed-selection.component';

const routes: Routes = [
  { path: 'feed-selection', pathMatch: 'full', component: FeedSelectionComponent, data: { title: 'Feed Selection' } },
];

@NgModule({
  declarations: [FeedSelectionComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    MatExpansionModule
  ]
})
export class FeedCreationModule { }
