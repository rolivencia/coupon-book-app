import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ContactPage } from "./contact.page";
import { HeaderModule } from "@app/_components/header/header.module";
import { ImageCardModule } from "@app/_components/image-card/image-card.module";

const routes: Routes = [
  {
    path: "",
    component: ContactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    ImageCardModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
