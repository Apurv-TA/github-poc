import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-offer-package-recommended-offers',
  templateUrl: './offer-package-recommended-offers.component.html',
  styleUrls: ['./offer-package-recommended-offers.component.scss'],
})
export class OfferPackageRecommendedOffersComponent implements OnInit {


@Input('promoRecommenderFlag') promoRecommenderFlag : any;

  constructor()
  {

  }

  ngOnInit(): void {
    this.promoRecommenderFlag = true;
  }



}
