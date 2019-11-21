import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Coupon} from "@app/_models/coupon";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";
import {CouponService} from "@app/_services/coupons.service";
import {AuthService} from "@app/_services/auth.service";

@Injectable({
  providedIn: "root"
})
export class CouponsResolverService implements Resolve<Observable<Coupon[]>> {
  constructor(
    private authService: AuthService,
    private couponService: CouponService
  ) {}

  resolve(): Observable<Coupon[]> {
    return this.couponService
      .getRedeemable(this.authService.currentCustomer)
      .pipe(first());
  }
}
