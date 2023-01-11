import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPackageRecommendedOffersComponent } from './offer-package-recommended-offers.component';

describe('OfferPackageRecommendedOffersComponent', () => {
  let component: OfferPackageRecommendedOffersComponent;
  let fixture: ComponentFixture<OfferPackageRecommendedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPackageRecommendedOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPackageRecommendedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
