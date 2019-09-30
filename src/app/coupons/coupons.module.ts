import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CouponsPage } from "./coupons.page";
import { HeaderModule } from "../_components/header/header.module";

const routes: Routes = [
  {
    path: "",
    component: CouponsPage
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
