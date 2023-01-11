import { TestBed } from '@angular/core/testing';

import { ScenarioComparisionService } from './scenario-comparision.service';

describe('ScenarioComparisionService', () => {
  let service: ScenarioComparisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioComparisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
