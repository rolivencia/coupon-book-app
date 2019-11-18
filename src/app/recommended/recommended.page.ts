import { Component, OnInit } from "@angular/core";
import { RecommendedService } from "@app/_services/recommended.service";

@Component({
  selector: "app-recommended",
  templateUrl: "./recommended.page.html",
  styleUrls: ["./recommended.page.scss"]
})
export class RecommendedPage {


  constructor(public recommendedService: RecommendedService) {}

  ionViewWillEnter() {
    console.log();
    this.recommendedService.get().subscribe(result => {
      this.recommendedService.recommended = result;
    });
  }
}
