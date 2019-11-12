import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import * as moment from "moment";
import { Coupon } from "@app/_models/coupon";

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

  public getAll = (expired = false, deleted = false): Observable<Coupon[]> => {
    return this.http
      .get<Coupon[]>(`${environment.apiUrl}/coupon/all/${expired}/${deleted}`)
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

    /**
     * Retrieves last 5 redeemed coupons, sorted starting from the latest, for a given customer
     * @param idCustomer
     */
  public getRedeemed = (idCustomer: number) => {
    return this.http
      .get<any>(
        `${environment.apiUrl}/coupon/getRedeemed/${idCustomer}/${3}/${0}`
      )
      .pipe(first());
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
