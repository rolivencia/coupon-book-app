import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CouponService } from "@app/_services/coupons.service";

@Injectable({
  providedIn: "root"
})
export class CouponDetailResolverService {
  constructor(private couponService: CouponService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get("id");
    return this.couponService.getById(parseInt(id, 10));
  }
}
