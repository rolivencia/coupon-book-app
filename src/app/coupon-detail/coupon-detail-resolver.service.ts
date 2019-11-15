import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { CouponService } from "@app/_services/coupons.service";

@Injectable({
  providedIn: "root"
})
export class CouponDetailResolverService {
  constructor(private couponService: CouponService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const idAsString = route.paramMap.get("id");
    const id = idAsString ? parseInt(idAsString, 10) : 0;

    const local = this.couponService.getByIdLocal(id);

    return local ? local : this.resolveRemote(id);
  }

  /**
   * Retrieve the desired coupon from the server
   * @param id - Id of the desired coupon
   */
  async resolveRemote(id: number) {
    const returnValue = await this.couponService.getByIdRemote(id).toPromise();
    return returnValue;
  }
}
