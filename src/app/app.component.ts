import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./_services/auth.service";
import { Platform } from "@ionic/angular";
import { Component } from "@angular/core";
import * as moment from 'moment';
import {NotificationService} from "@app/_services/notification.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private notificationService: NotificationService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    moment.locale('es');
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
      icon: "pricetags"
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
    // {
    //   title: "Perfil",
    //   url: "/profile",
    //   icon: "contact"
    // }
  ];

  initializeApp() {
    this.authService.init();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Start the notification service
      if (this.platform.is('cordova')) {
        this.notificationService.init();
      }
    });
  }
}
