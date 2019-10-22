import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {Coupon} from '@app/_models/coupon';

@Component({
  selector: "app-coupon-detail",
  templateUrl: "./coupon-detail.page.html",
  styleUrls: ["./coupon-detail.page.scss"]
})
export class CouponDetailPage implements OnInit {
  coupon: Coupon;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.route.snapshot.data["coupon"]) {
      this.coupon = this.route.snapshot.data["coupon"];
    }
  }
}
