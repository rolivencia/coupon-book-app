import { Component, OnInit } from "@angular/core";
import { CouponService } from "@app/_services/coupons.service";
import { first } from "rxjs/operators";
import { Coupon } from "@app/_models/coupon";
import { Router } from "@angular/router";

@Component({
  selector: "app-coupons",
  templateUrl: "./coupons.page.html",
  styleUrls: ["./coupons.page.scss"]
})
export class CouponsPage implements OnInit {

  constructor(public couponService: CouponService, private router: Router) {}

  ngOnInit() {
    this.couponService
      .getAll()
      .pipe(first())
      .subscribe(result => (this.couponService.coupons = result));
  }

  viewDetail(coupon: Coupon) {
    this.router.navigate(['/coupon-detail/' + coupon.id], );
  }
}
