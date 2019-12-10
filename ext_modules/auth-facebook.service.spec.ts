import { TestBed } from '@angular/core/testing';

import { AuthFacebookService } from './auth-facebook.service';

describe('AuthFacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthFacebookService = TestBed.get(AuthFacebookService);
    expect(service).toBeTruthy();
  });
});
