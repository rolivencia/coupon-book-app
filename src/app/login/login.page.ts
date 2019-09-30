import { Component, OnInit } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import {AuthService} from '../_services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  private loading;

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.showLoading();

    this.authService.loggedIn.subscribe(status => {
      this.loading.dismiss();

      if (status) {
        this.navCtrl.navigateForward("/home");
      }
    });
  }

  async login(platform: string = "facebook") {
    await this.showLoading();
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

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: "Iniciando sesión..."
    });

    this.loading.present();
  }
}
