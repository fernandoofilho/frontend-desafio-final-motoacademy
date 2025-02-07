import { TestBed } from '@angular/core/testing';

import { YearFilterService } from './year-filter.service';

describe('YearFilterService', () => {
  let service: YearFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
