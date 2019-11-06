import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./_services/auth.service";
import { Platform } from "@ionic/angular";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  public appPages = [
    {
      title: "Inicio",
      url: "/home",
      icon: "home"
    },
    {
      title: "Cuponera",
      url: "/coupons",
      icon: "beer"
    },
    {
      title: "Recomendados",
      url: "/recommended",
      icon: "pizza"
    },
    {
      title: "Contacto y Reservas",
      url: "/contact",
      icon: "send"
    },
    {
      title: "Perfil",
      url: "/profile",
      icon: "contact"
    }
  ];

  initializeApp() {
    this.authService.init();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
