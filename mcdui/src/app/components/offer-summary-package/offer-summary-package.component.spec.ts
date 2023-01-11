import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSummaryPackageComponent } from './offer-summary-package.component';

describe('OfferSummaryPackageComponent', () => {
  let component: OfferSummaryPackageComponent;
  let fixture: ComponentFixture<OfferSummaryPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferSummaryPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSummaryPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
