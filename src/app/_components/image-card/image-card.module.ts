import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageCardComponent } from "@app/_components/image-card/image-card.component";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [ImageCardComponent],
  exports: [ImageCardComponent],
  imports: [CommonModule, IonicModule]
})
export class ImageCardModule {}
