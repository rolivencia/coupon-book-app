import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Coupon } from "@app/_models/coupon";
import { ThemeService } from "@app/_services/theme.service";

@Component({
  selector: "app-coupon-detail",
  templateUrl: "./coupon-detail.page.html",
  styleUrls: ["./coupon-detail.page.scss"]
})
export class CouponDetailPage implements OnInit {

  coupon: Coupon;
  buttonLabel: string = "Ver QR para Canjear";
  view: string = "detail";
  redeemed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data["coupon"]) {
      this.coupon = this.route.snapshot.data["coupon"];
    }
  }

  changeCouponView() {
    this.view = this.view === "detail" ? "redeem" : "detail";
    this.buttonLabel = this.view === "detail" ? "Ver QR para Canjear" : "Volver";
  }
}
