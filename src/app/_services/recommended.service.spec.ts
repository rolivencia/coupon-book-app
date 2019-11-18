import { TestBed } from '@angular/core/testing';

import { RecommendedService } from './recommended.service';

describe('RecommendedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendedService = TestBed.get(RecommendedService);
    expect(service).toBeTruthy();
  });
});
