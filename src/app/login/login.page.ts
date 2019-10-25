import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { AuthService } from "../_services/auth.service";
import { LoadingService } from "@app/_services/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    await this.loadingService.showLoading();

    this.authService.loggedIn.subscribe(
      status => {
        this.loadingService.loading.dismiss();

        if (status) {
          this.navCtrl.navigateForward("/home");
        }
      },
      error => {
        this.loadingService.loading.dismiss();
      }
    );
  }

  async login(platform: string = "facebook") {
    await this.loadingService.showLoading();
    switch (platform) {
      case "facebook":
        this.authService.facebookLogin();
        break;
      case "google":
        this.authService.googleLogin();
        break;
      default:
        break;
    }
  }
}
