import { Component } from "@angular/core";
import { RecommendedService } from "@app/_services/recommended.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recommended",
  templateUrl: "./recommended.page.html",
  styleUrls: ["./recommended.page.scss"]
})
export class RecommendedPage {
  constructor(
    public recommendedService: RecommendedService,
    private route: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    if (this.route.snapshot.data["recommended"]) {
      this.recommendedService.recommended = this.route.snapshot.data[
        "recommended"
      ];
    }
  }
}
