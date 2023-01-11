/* Angular Pre-Defined Components */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Shared modules */
import { MaterialModule } from '../../modules/material/material.module';
import { SharedModule } from '../../modules/shared/shared.module';

/** user defined components */
import { OfferConfigurationComponent } from '../../components/offer-configuration/offer-configuration.component';
import { JobSummaryComponent } from '../../components/job-summary/job-summary.component';
import { OfferRecommenderComponent } from '../../components/offer-recommender/offer-recommender.component';
import { RecommendedImpactComponent } from '../../components/recommended-impact/recommended-impact.component';
import { SegmentComponent } from '../../components/segment/segment.component';
import { ProductCategoryComponent } from '../../components/product-category/product-category.component';
import { OfferSummaryPackageComponent } from '../../components/offer-summary-package/offer-summary-package.component';
import { OfferPackageDetailsComponent } from '../../components/offer-package-details/offer-package-details.component';
import { OfferPackageRecommendedOffersComponent } from '../../components/offer-package-recommended-offers/offer-package-recommended-offers.component';
import { OfferPackageImpactPromoComponent } from '../../components/offer-package-impact-promo/offer-package-impact-promo.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const routes: Routes = [

  { path: '', pathMatch: 'full', component: JobSummaryComponent, data: { title: 'Job Summary' } },
  { path: 'offer-configuration', pathMatch: 'full', component: OfferConfigurationComponent, data: { title: 'Offer Configuration' } },
  { path: 'offer-configuration/:preview', pathMatch: 'full', component: OfferConfigurationComponent, data: { title: 'Offer Configuration' } },
  { path: 'offer-configuration/:type/:offerId', pathMatch: 'full', component: OfferConfigurationComponent, data: { title: 'Offer Configuration' } },
  { path: 'offer-recommender', pathMatch: 'full', component: OfferRecommenderComponent, data: { title: 'Offer Configuration' } },
  { path: 'offer-recommender/:offerId', pathMatch: 'full', component: OfferRecommenderComponent, data: { title: 'Offer Configuration' } },
  { path: 'recommended-impact/:offerId', pathMatch: 'full', component: RecommendedImpactComponent, data: { title: 'Recommended Impact' } },
  { path: 'offer-package-summary/:offerId', pathMatch: 'full', component: OfferSummaryPackageComponent, data: { title: 'offer detail' } },

];


@NgModule({
  declarations: [
    OfferConfigurationComponent,
    SegmentComponent,
    RecommendedImpactComponent,
    OfferRecommenderComponent,
    JobSummaryComponent,
    OfferSummaryPackageComponent,
    OfferPackageDetailsComponent,
    OfferPackageRecommendedOffersComponent,
    OfferPackageImpactPromoComponent,

  ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
})
export class DiscountRecommenderModule { }
