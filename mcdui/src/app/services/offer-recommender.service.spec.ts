import { TestBed } from '@angular/core/testing';

import { OfferRecommenderService } from './offer-recommender.service';

describe('OfferRecommenderService', () => {
  let service: OfferRecommenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferRecommenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
