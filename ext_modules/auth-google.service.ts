import { Injectable } from "@angular/core";
import { AuthService } from "@app/_services/auth.service";
import firebase from "@firebase/app";
import "@firebase/auth";
import { LoadingService } from "@app/_services/loading.service";
// import { GooglePlus } from "@ionic-native/google-plus/ngx";
import {Platform} from "@ionic/angular";
import {CustomerService} from "@app/_services/customer.service";

@Injectable({
  providedIn: "root"
})
export class AuthGoogleService {
  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private google: GooglePlus,
    private loadingService: LoadingService,
    private platform: Platform
  ) {}

  googleLogin(): void {
    if (this.platform.is("capacitor")) {
      if (this.platform.is("android")) {
        this.androidGoogleAuth();
      } else if (this.platform.is("ios")) {
      }
    } else {
      this.googleBrowserAuth();
    }
  }

  async googleBrowserAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result: any = await firebase.auth().signInWithPopup(provider);
      await this.customerService.logInSqlDatabase(result, "Google");
      this.authService.loggedIn.next(true);
    } catch (err) {
      this.loadingService.loading.dismiss();
      this.authService.errorHandler(err);
    }
  }

  async androidGoogleAuth() {
    try {
      const response = await this.google.login({
        scopes: "",
        webClientId:
          "169323504498-vggv4krnrvhut57qhjbr465taaen5g25.apps.googleusercontent.com",
        offline: true
      });
      const { idToken, accessToken } = response;
      const credential = accessToken
        ? firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
        : firebase.auth.GoogleAuthProvider.credential(idToken);

      // Sign in with the credential from the Google user.
      const result = await firebase.auth().signInWithCredential(credential);
      await this.customerService.logInSqlDatabase(result, "Google");
      this.authService.loggedIn.next(true);
    } catch (err) {
      this.authService.errorHandler(err);
    }
  }

  async logout(){
    await this.google.logout();
  }
}
