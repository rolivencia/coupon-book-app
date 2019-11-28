import { Injectable } from "@angular/core";
import firebase from "@firebase/app";
import "@firebase/auth";
import { Facebook } from "@ionic-native/facebook/ngx";
import { AuthService } from "@app/_services/auth.service";
import { LoadingService } from "@app/_services/loading.service";
import { Platform } from "@ionic/angular";
import { CustomerService } from "@app/_services/customer.service";
@Injectable({
  providedIn: "root"
})
export class AuthFacebookService {
  constructor(
    private authService: AuthService,
    private customerService: CustomerService,

    private facebook: Facebook,
    private loadingService: LoadingService,
    private platform: Platform
  ) {}

  facebookLogin(): void {
    if (this.platform.is("capacitor")) {
      this.nativeFacebookAuth();
    } else {
      this.browserFacebookAuth();
    }
  }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const response = await this.facebook.login(["public_profile", "email"]);

      // User is signed-out of Facebook.
      if (!response.authResponse) {
        firebase.auth().signOut();
      }

      // User is signed-in Facebook.
      const unsubscribe = firebase
        .auth()
        .onAuthStateChanged(async firebaseUser => {
          unsubscribe();

          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(response.authResponse, firebaseUser)) {
            try {
              // Build Firebase credential with the Facebook auth token.
              const credential = firebase.auth.FacebookAuthProvider.credential(
                response.authResponse.accessToken
              );
              // Sign in with the credential from the Facebook user.
              const result: any = await firebase
                .auth()
                .signInWithCredential(credential);
              await this.customerService.logInSqlDatabase(result, "Facebook");
              this.authService.loggedIn.next(true);
            } catch (err) {
              this.authService.errorHandler(err);
            }
          }
        });
    } catch (err) {
      this.authService.errorHandler(err);
    }
  }
  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
      const result: any = await firebase.auth().signInWithPopup(provider);
      await this.customerService.logInSqlDatabase(result, "Facebook");
      this.authService.loggedIn.next(true);
    } catch (err) {
      this.loadingService.loading.dismiss();
      this.authService.errorHandler(err);
    }
  }

  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach(data => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }

  async logout() {
    await this.facebook.logout(); // Unauth with Facebook
  }
}
