import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPackageImpactPromoComponent } from './offer-package-impact-promo.component';

describe('OfferPackageImpactPromoComponent', () => {
  let component: OfferPackageImpactPromoComponent;
  let fixture: ComponentFixture<OfferPackageImpactPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPackageImpactPromoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPackageImpactPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
