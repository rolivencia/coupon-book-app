import { TestBed } from '@angular/core/testing';

import { CouponDetailResolverService } from './coupon-detail-resolver.service';

describe('CouponDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouponDetailResolverService = TestBed.get(CouponDetailResolverService);
    expect(service).toBeTruthy();
  });
});
