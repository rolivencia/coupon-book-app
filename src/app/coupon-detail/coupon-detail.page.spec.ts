import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDetailPage } from './coupon-detail.page';

describe('CouponDetailPage', () => {
  let component: CouponDetailPage;
  let fixture: ComponentFixture<CouponDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
