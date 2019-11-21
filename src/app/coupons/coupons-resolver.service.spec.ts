import { TestBed } from '@angular/core/testing';

import { CouponsResolverService } from './coupons-resolver.service';

describe('CouponsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouponsResolverService = TestBed.get(CouponsResolverService);
    expect(service).toBeTruthy();
  });
});
