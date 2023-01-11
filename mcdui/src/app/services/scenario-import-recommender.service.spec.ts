import { TestBed } from '@angular/core/testing';

import { ScenarioImportRecommenderService } from './scenario-import-recommender.service';

describe('ScenarioImportRecommenderService', () => {
  let service: ScenarioImportRecommenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioImportRecommenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
