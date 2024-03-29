import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

import {IonicModule} from "@ionic/angular";

import {CouponsPage} from "./coupons.page";
import {HeaderModule} from "../_components/header/header.module";
import {CouponsResolverService} from "@app/coupons/coupons-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: CouponsPage,
    resolve: {
      coupons: CouponsResolverService
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CouponsPage]
})
export class CouponsPageModule {}
