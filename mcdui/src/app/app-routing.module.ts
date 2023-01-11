import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as component from './components';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginGuard } from './shared/constant/login.guard';
import { HelpComponent } from './components/help/help.component';
import { RaiseIssueTrackerComponent } from './components/raise-issue-tracker/raise-issue-tracker.component';
import { ViewKpiComponent } from './components/view-kpi/view-kpi.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent, data: { title: 'Login' } },
  { path: '', redirectTo: 'login', pathMatch: 'full', data: { title: 'Login' } },
  {
    path: 'mcd', component: component.McdComponent, canActivate: [LoginGuard], children: [
      { path: 'dashboard', pathMatch: 'full', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'help', pathMatch: 'full', component: HelpComponent, data: { title: 'Help' } },
      { path: 'issue-tracker', pathMatch: 'full', component: RaiseIssueTrackerComponent, data: { title: 'Raise & Issue Tracker' } },
      { path: 'view-kpi', pathMatch: 'full', component: ViewKpiComponent, data: { title: 'View KPI' } },
      { path: 'discount', loadChildren: () => import('src/app/modules/discount-recommender/discount-recommender.module').then(m => m.DiscountRecommenderModule) },
      { path: 'planner', loadChildren: () => import('src/app/modules/scenario-planner/scenario-planner.module').then(m => m.ScenarioPlannerModule) },
      { path: 'comparison', loadChildren: () => import('src/app/modules/scenario-comparison/scenario-comparison.module').then(m => m.ScenarioComparisonModule) },
      { path: 'feed', loadChildren: () => import('src/app/modules/feed-creation/feed-creation.module').then(m => m.FeedCreationModule) },
    ]
  },
  { path: 'forgot', pathMatch: 'full', component: ForgotPasswordComponent, data: { title: 'Forgot' } },
  { path: 'reset', pathMatch: 'full', component: ResetPasswordComponent, data: { title: 'Reset' } },
  { path: '**', redirectTo: 'login', pathMatch: 'full', data: { title: 'Login' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  component.TopNavbarComponent,
  component.McdComponent];
