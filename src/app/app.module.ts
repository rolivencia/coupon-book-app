import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { RouteReuseStrategy } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LoadingService } from "@app/_services/loading.service";
import { AlertService } from "@app/_services/alert.service";
import { ErrorInterceptor, JwtInterceptor } from "@app/_helpers";
import { ThemeService } from "@app/_services/theme.service";
import { HeaderModule } from "@app/_components/header/header.module";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { AuthService } from "@app/_services/auth.service";
import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";
import { Device } from "@ionic-native/device/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HeaderModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AlertService,
    Device,
    FirebaseAuthentication,
    LoadingService,
    OneSignal,
    StatusBar,
    SplashScreen,
    ThemeService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
