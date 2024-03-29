import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { ThemeService } from "@app/_services/theme.service";
import { CouponService } from "@app/_services/coupons.service";
import * as moment from "moment";
import { LoadingService } from "@app/_services/loading.service";
import { first } from "rxjs/operators";
import { interval } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  redeemedCoupons = [];
  loaded = false;

  constructor(
    public authService: AuthService,
    public couponService: CouponService,
    private loadingService: LoadingService,
    public themeService: ThemeService
  ) {}

  async ionViewWillEnter() {
    await this.loadingService.showLoading("Cargando...");

    const checkCustomer = interval(100).subscribe(() => {
      if (
        this.authService.currentCustomer &&
        this.authService.currentCustomer.id
      ) {
        checkCustomer.unsubscribe();
        this.couponService
          .getRedeemed(this.authService.currentCustomer.id)
          .pipe(first())
          .subscribe(redeemed => {
            this.loaded = true;
            this.loadingService.loading.dismiss();
            this.redeemedCoupons = redeemed;
            this.redeemedCoupons = this.formatRedemptionDates();
          });
      }
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

  generatePlatformInfo(original: string) {
    // Remove .com domain
    const removedDomain = this.authService.loggedWith.replace(".com", "");
    // Capitalize
    return removedDomain.charAt(0).toUpperCase() + removedDomain.slice(1);
  }
}
