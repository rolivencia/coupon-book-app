import { Component } from "@angular/core";
import { AuthService } from "@app/_services/auth.service";
import { CustomerService } from "@app/_services/customer.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  phone: string = "54342";
  // phone: string = "543425783414";
  firstName: string = "";
  lastName: string = "";
  verificationCode: string = "";

  alreadyRegistered = false;
  registrationFormVisible = false;

  recaptchaVerifier;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService
  ) {}

  ionViewDidEnter() {
    this.authService.verificationCodeSent.pipe(first()).subscribe(status => {
      this.registrationFormVisible = status;
    });
  }

  async getCode() {
    const customer = await this.customerService
      .getByEmail(this.phone)
      .toPromise();

    if (customer) {
      this.firstName = customer.firstName;
      this.lastName = customer.lastName;
      this.alreadyRegistered = true;
    }

    this.authService.verificationCodeSent.next(false);
    this.authService.verificationId = "";

    const parsedPhone = this.phone.startsWith("+")
      ? this.phone
      : "+" + this.phone;

    this.recaptchaVerifier = this.recaptchaVerifier
      ? this.recaptchaVerifier
      : this.authService.getVerificationCaptcha();

    this.authService.getSmsVerificationCode(
      parsedPhone,
      this.recaptchaVerifier
    );
  }

  checkIfRegistered() {
    return !this.alreadyRegistered ? this.firstName && this.lastName : true;
  }

  resetPhone() {
    this.registrationFormVisible = false;
  }

  clear() {
    this.authService.verificationCodeSent.next(false);
    this.authService.verificationId = "";
  }

  register() {
    this.authService.smsAuth(
      { firstName: this.firstName, lastName: this.lastName, email: this.phone },
      this.authService.verificationId,
      this.verificationCode
    );
  }
}
