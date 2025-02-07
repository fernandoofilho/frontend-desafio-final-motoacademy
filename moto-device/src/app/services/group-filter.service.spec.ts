import { TestBed } from '@angular/core/testing';

import { GroupFilterService } from './group-filter.service';

describe('GroupFilterService', () => {
  let service: GroupFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
