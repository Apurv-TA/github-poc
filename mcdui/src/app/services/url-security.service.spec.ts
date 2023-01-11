import { TestBed } from '@angular/core/testing';

import { UrlSecurityService } from './url-security.service';

describe('UrlSecurityService', () => {
  let service: UrlSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
