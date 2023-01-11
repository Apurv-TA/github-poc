import { TestBed } from '@angular/core/testing';

import { PackageSummaryService } from './package-summary.service';

describe('PackageSummaryService', () => {
  let service: PackageSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
