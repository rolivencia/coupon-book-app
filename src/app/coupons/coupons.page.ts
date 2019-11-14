import { Component, OnInit } from "@angular/core";
import { CouponService } from "@app/_services/coupons.service";
import { first } from "rxjs/operators";
import { Coupon } from "@app/_models/coupon";
import { Router } from "@angular/router";
import { LoadingService } from "@app/_services/loading.service";
import { AuthService } from "@app/_services/auth.service";

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.page.html",
  styleUrls: ["./coupons.page.scss"]
})
export class CouponsPage {
  constructor(
    public couponService: CouponService,
    public authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  async ionViewWillEnter(){
    await this.loadingService.showLoading("Cargando...");

    this.couponService
        .getRedeemable(this.authService.currentCustomer)
        .pipe(first())
        .subscribe(result => {
          this.loadingService.loading.dismiss();
          this.couponService.coupons = result;
        });
  }

  viewDetail(coupon: Coupon) {
    this.router.navigate(["/coupon-detail/" + coupon.id]);
  }
}
