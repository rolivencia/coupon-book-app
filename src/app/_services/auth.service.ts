import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";

import { Facebook } from "@ionic-native/facebook/ngx";

import { BehaviorSubject, Observable } from "rxjs";
import firebase from "@firebase/app";
import "@firebase/auth";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Customer } from "@app/_models/customer";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { LoadingService } from "@app/_services/loading.service";
import { AlertService } from "@app/_services/alert.service";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private customerSubject: BehaviorSubject<Customer>;
  public customer: Observable<Customer>;

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private alertService: AlertService,
    private platform: Platform,
    private zone: NgZone,
    private facebook: Facebook,
    public httpClient: HttpClient,
    private google: GooglePlus,
    private loadingService: LoadingService
  ) {
    this.customerSubject = new BehaviorSubject<Customer>(
      JSON.parse(localStorage.getItem("customer"))
    );
    this.customer = this.customerSubject.asObservable();
  }

  public get currentCustomer(): Customer {
    return this.customerSubject.value;
  }

  init(): void {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAi2xsjCLF1UDSVzClwoqUWFWqHLeXxuFo",
      authDomain: "brugge-f8811.firebaseapp.com",
      databaseURL: "https://brugge-f8811.firebaseio.com",
      projectId: "brugge-f8811",
      storageBucket: "",
      messagingSenderId: "287785352097",
      appId: "1:287785352097:web:4de8ee41608bfb9fece9e0",
      measurementId: "G-X18QJ9G9QC"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  facebookLogin(): void {
    // if (this.platform.is("capacitor")) {
    //   this.nativeFacebookAuth();
    // } else {
    this.browserFacebookAuth();
    // }
  }

  googleLogin(): void {
    this.googleAuth();
  }
  mailLogin(): void {
    // this.mailAuth();
  }

  async logout(): Promise<void> {
    if (this.platform.is("capacitor")) {
      try {
        await this.facebook.logout(); // Unauth with Facebook
        await this.google.logout(); // Unauth with Google
        await firebase.auth().signOut(); // Unauth with Firebase
      } catch (err) {
        this.loadingService.loading.dismiss();
        console.log(err);
      }
    } else {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        this.loadingService.loading.dismiss();
        console.error(err);
      }
    }

    // remove user from local storage to log user out
    localStorage.removeItem("customer");
    this.customerSubject.next(null);
  }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const response = await this.facebook.login(["public_profile", "email"]);

      console.log(response);

      if (response.authResponse) {
        // User is signed-in Facebook.
        const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(response.authResponse, firebaseUser)) {
            // Build Firebase credential with the Facebook auth token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              response.authResponse.accessToken
            );
            // Sign in with the credential from the Facebook user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .catch(error => {
                console.log(error);
              });
            this.loggedIn.next(true);
          } else {
            // User is already signed-in Firebase with the correct user.
            console.log("already signed in");
          }
        });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result: any = await firebase.auth().signInWithPopup(provider);
      const customer: Customer = {
        firstName: result.additionalUserInfo.profile.first_name,
        lastName: result.additionalUserInfo.profile.last_name,
        imageUrl: result.additionalUserInfo.profile.picture.data.url,
        uidFirebase: result.additionalUserInfo.profile.id,
        email: result.additionalUserInfo.profile.email
      };
      const sqlUser = await this.create(customer).toPromise();
      localStorage.setItem("customer", JSON.stringify(sqlUser));
      this.customerSubject.next(sqlUser);
      this.loggedIn.next(true);
    } catch (err) {
      this.loadingService.loading.dismiss();
      if (err.code === "auth/account-exists-with-different-credential") {
        this.alertService.show(
          "¡Error!",
          "¡Vaya! Tu email ya está asociado a otra plataforma.\n\n Intentá ingresar con una de las otras dos opciones."
        );
      } else {
        console.error(err);
      }
    }
  }

  async googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result: any = await firebase.auth().signInWithPopup(provider);
      const customer: Customer = {
        firstName: result.additionalUserInfo.profile.given_name,
        lastName: result.additionalUserInfo.profile.family_name,
        imageUrl: result.additionalUserInfo.profile.picture,
        uidFirebase: result.additionalUserInfo.profile.id,
        email: result.additionalUserInfo.profile.email
      };
      const sqlUser = await this.create(customer)
        .pipe(first())
        .subscribe(response => {
          localStorage.setItem("customer", JSON.stringify(response));
          this.customerSubject.next(response);
          this.loggedIn.next(true);
          console.log(response);
        });
    } catch (err) {
      console.error(err);
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

  getById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(
      `${environment.apiUrl}/customer/${id}`
    );
  }

  create(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(
      `${environment.apiUrl}/customer/create`,
      {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        uidFirebase: customer.uidFirebase
      }
    );
  }
}
