import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Coupon } from "@app/_models/coupon";
import { ThemeService } from "@app/_services/theme.service";
import { AuthService } from "@app/_services/auth.service";

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

  couponCustomerCode: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data["coupon"]) {
      this.coupon = this.route.snapshot.data["coupon"];
    }
  }

  ngAfterViewInit(){
    this.generateQrCode();
  }

  changeCouponView() {
    this.view = this.view === "detail" ? "redeem" : "detail";
    this.buttonLabel =
      this.view === "detail" ? "Ver QR para Canjear" : "Volver";
  }

  generateQrCode(){
    this.couponCustomerCode = JSON.stringify({customer: this.authService.currentCustomer, coupon: this.coupon});
  }
}
