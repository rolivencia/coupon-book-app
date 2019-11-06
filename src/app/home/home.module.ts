import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { HeaderModule } from "../_components/header/header.module";
import { ImageCardModule } from "@app/_components/image-card/image-card.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    ImageCardModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
