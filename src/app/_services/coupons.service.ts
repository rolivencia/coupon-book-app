import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import * as moment from "moment";
import {Coupon} from '@app/_models/coupon';

@Injectable({
  providedIn: "root"
})
export class CouponService {
  private _coupons: Coupon[] = [];

  constructor(private http: HttpClient) {}

  get coupons(): Coupon[] {
    return this._coupons;
  }

  set coupons(value: Coupon[]) {
    this._coupons = value;
  }

  public getAll = (): Observable<Coupon[]> => {
    return this.http
      .get<Coupon[]>(`${environment.apiUrl}/coupon`)
      .pipe(first())
      .pipe(
        map(coupons =>
          coupons.map(coupon => ({
            ...coupon,
            audit: {
              ...coupon.audit,
              createdAt: moment(coupon.audit.createdAt),
              updatedAt: moment(coupon.audit.updatedAt)
            },
            startsAt: moment(coupon.startsAt),
            endsAt: moment(coupon.endsAt)
          }))
        )
      );
  };

  public getById = (id: number): Coupon => {
    return this.coupons.filter(coupon => coupon.id === id).pop();
  };

  public redeem = (code: string, idUser: number): Coupon => {
    return null;
  };

  public getByCode = (code: string): Coupon => {
    return null;
  };
}
