import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Coupon} from "@app/_models/coupon";
import {ThemeService} from "@app/_services/theme.service";
import {AuthService} from "@app/_services/auth.service";
import * as moment from 'moment';
@Component({
  selector: "app-coupon-detail",
  templateUrl: "./coupon-detail.page.html",
  styleUrls: ["./coupon-detail.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class CouponDetailPage implements OnInit {

  coupon: Coupon;
  buttonLabel: string = "Volver";
  view: string = "detail";
  redeemed: boolean = false;

  couponCustomerCode: string;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public themeService: ThemeService
  ) {
    moment.locale('es');
  }

  ngOnInit() {
    if (this.route.snapshot.data["coupon"]) {
      this.coupon = this.route.snapshot.data["coupon"];
      this.generateQrCode();
    }
  }

  generateQrCode(){
    this.couponCustomerCode = JSON.stringify({idCustomer: this.authService.currentCustomer.id, idCoupon: this.coupon.id});
  }

  goBack() {
    this.router.navigate(['/coupons']);
  }
}
