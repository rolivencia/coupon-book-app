import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsPage } from './coupons.page';

describe('CouponsPage', () => {
  let component: CouponsPage;
  let fixture: ComponentFixture<CouponsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
