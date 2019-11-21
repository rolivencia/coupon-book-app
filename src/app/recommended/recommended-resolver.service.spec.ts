import { TestBed } from '@angular/core/testing';

import { RecommendedResolverService } from './recommended-resolver.service';

describe('RecommendedResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecommendedResolverService = TestBed.get(RecommendedResolverService);
    expect(service).toBeTruthy();
  });
});
