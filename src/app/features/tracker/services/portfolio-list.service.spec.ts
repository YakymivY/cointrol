import { TestBed } from '@angular/core/testing';

import { PortfolioListService } from './portfolio-list.service';

describe('PortfolioListService', () => {
  let service: PortfolioListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
