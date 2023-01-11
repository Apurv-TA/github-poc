import { TestBed } from '@angular/core/testing';

import { OfferPackageDetailService } from './offer-package-detail.service';

describe('OfferPackageDetailService', () => {
  let service: OfferPackageDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferPackageDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
