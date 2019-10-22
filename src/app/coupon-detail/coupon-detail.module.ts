import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CouponDetailPage } from "./coupon-detail.page";
import { CouponDetailResolverService } from "@app/coupon-detail/coupon-detail-resolver.service";
import { HeaderModule } from "@app/_components/header/header.module";
import { QRCodeModule } from "angularx-qrcode";

const routes: Routes = [
  {
    path: ":id",
    component: CouponDetailPage,
    resolve: {
      coupon: CouponDetailResolverService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    RouterModule.forChild(routes),
    QRCodeModule
  ],
  declarations: [CouponDetailPage]
})
export class CouponDetailPageModule {}
