import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProfilePage } from "./profile.page";
import { HeaderModule } from "../_components/header/header.module";
import {ImageCardModule} from "@app/_components/image-card/image-card.module";

const routes: Routes = [
  {
    path: "",
    component: ProfilePage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HeaderModule,
        IonicModule,
        RouterModule.forChild(routes),
        ImageCardModule
    ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
