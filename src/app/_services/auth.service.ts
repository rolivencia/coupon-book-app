import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Facebook } from "@ionic-native/facebook/ngx";
import { BehaviorSubject, Observable } from "rxjs";
import firebase from "@firebase/app";
import "@firebase/auth";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Customer } from "@app/_models/customer";
import { LoadingService } from "@app/_services/loading.service";
import { AlertService } from "@app/_services/alert.service";
import { Router } from "@angular/router";
import { CustomerService } from "@app/_services/customer.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private customerSubject: BehaviorSubject<Customer>;
  public verificationId: string = "";

  public customer: Observable<Customer>;
  public loggedWith: string = "";

  public verificationCodeSent: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private alertService: AlertService,
    private customerService: CustomerService,
    private platform: Platform,
    private zone: NgZone,

    public httpClient: HttpClient,

    private loadingService: LoadingService,
    private router: Router
  ) {
    this.customerSubject = new BehaviorSubject<Customer>(
      JSON.parse(localStorage.getItem("customer"))
    );
    this.customer = this.customerSubject.asObservable();
  }

  public get currentCustomer(): Customer {
    return this.customerSubject.value;
  }

  getVerificationCaptcha() {
    return new firebase.auth.RecaptchaVerifier("recaptcha-verifier", {
      size: "invisible",
      callback: response => {
        console.log("got captcha!");
      }
    });
  }

  init(): void {
    // Initialize Firebase
    firebase.initializeApp(environment.firebaseConfig);

    // Emit logged in status whenever auth state changes
    firebase.auth().onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
        if (firebaseUser) {
          this.loggedWith = firebaseUser.providerData
            ? firebaseUser.providerData[0].providerId
            : null;
        }
      });
    });
  }

  async getSmsVerificationCode(phoneNumber: string, captcha: any) {
    this.loadingService.showLoading();
    try {
      const result = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, captcha);
      if (result) {
        this.verificationCodeSent.next(true);
        this.verificationId = result.verificationId;
      }
      this.loadingService.loading.dismiss();
    } catch (err) {
      this.loadingService.loading.dismiss();
      this.errorHandler(err);
    }
  }

  async smsAuth(userInfo: any, verificationId: string, code: string) {
    this.loadingService.showLoading();
    try {
      const credential = await firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );

      const result: any = await firebase
        .auth()
        .signInWithCredential(credential);

      const customer = await this.customerService.logInSqlDatabase(
        result,
        "SMS",
        userInfo
      );

      this.customerSubject.next(customer);
      this.loggedWith = "SMS";

      this.loggedIn.next(true);
      this.loadingService.loading.dismiss();
    } catch (err) {
      this.loadingService.loading.dismiss();
      this.errorHandler(err);
    }
  }

  async logout(): Promise<void> {
    if (this.platform.is("capacitor")) {
      try {
        if (this.loggedWith === "Facebook") {
          // this.authFacebook.logout(); // Unauth with Facebook
        }
        if (this.loggedWith === "Google") {
          // this.authGoogle.logout(); // Unauth with Google
        }
        await firebase.auth().signOut(); // Unauth with Firebase
        this.router.navigate(["login"]);
      } catch (err) {
        this.loadingService.loading.dismiss();
        console.log(err);
      }
    } else {
      try {
        await firebase.auth().signOut();
        this.router.navigate(["login"]);
      } catch (err) {
        this.loadingService.loading.dismiss();
        console.error(err);
      }
    }

    // remove user from local storage to log user out
    localStorage.removeItem("customer");
    this.customerSubject.next(null);
  }

  errorHandler(err) {
    this.loadingService.loading.dismiss();
    if (err.code === "auth/account-exists-with-different-credential") {
      this.alertService.show(
        "¡Error!",
        "¡Vaya! Tu email ya está asociado a otra plataforma.\n\n Intentá ingresar con la otra opción."
      );
    } else {
      console.error(err);
    }
  }
}
