import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "coupons",
    loadChildren: () =>
      import("./coupons/coupons.module").then(m => m.CouponsPageModule)
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfilePageModule)
  },
  {
    path: "coupon-detail",
    loadChildren: () =>
      import("./coupon-detail/coupon-detail.module").then(
        m => m.CouponDetailPageModule
      )
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then(m => m.RegisterPageModule)
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then(m => m.ContactPageModule)
  },
  {
    path: "recommended",
    loadChildren: () =>
      import("./recommended/recommended.module").then(
        m => m.RecommendedPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
