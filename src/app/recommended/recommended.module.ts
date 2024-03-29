import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { RecommendedPage } from "./recommended.page";
import { HeaderModule } from "@app/_components/header/header.module";
import { ImageCardModule } from "@app/_components/image-card/image-card.module";
import { RecommendedResolverService } from "@app/recommended/recommended-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: RecommendedPage,
    resolve: {
      recommended: RecommendedResolverService
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
    ImageCardModule
  ],
  declarations: [RecommendedPage]
})
export class RecommendedPageModule {}
