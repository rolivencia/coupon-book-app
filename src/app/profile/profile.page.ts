import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { ThemeService } from "@app/_services/theme.service";
import { CouponService } from "@app/_services/coupons.service";
import * as moment from "moment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  redeemedCoupons = [];

  constructor(
    public authService: AuthService,
    public couponService: CouponService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.couponService
      .getRedeemed(this.authService.currentCustomer.id)
      .subscribe(redeemed => {
        this.redeemedCoupons = redeemed;
        this.redeemedCoupons = this.formatRedemptionDates();
      });
  }

  logout() {
    this.authService.logout();
  }

  formatRedemptionDates() {
    return this.redeemedCoupons.map(redeemedCoupon => {
      return { ...redeemedCoupon, createdAt: moment(redeemedCoupon.createdAt) };
    });
  }
}
