import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferPackageDetailsComponent } from './offer-package-details.component';

describe('OfferPackageDetailsComponent', () => {
  let component: OfferPackageDetailsComponent;
  let fixture: ComponentFixture<OfferPackageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferPackageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
