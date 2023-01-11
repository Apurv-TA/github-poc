import { TestBed } from '@angular/core/testing';

import { ScenarioDiscountServiceService } from './scenario-discount-service.service';

describe('ScenarioDiscountServiceService', () => {
  let service: ScenarioDiscountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioDiscountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
