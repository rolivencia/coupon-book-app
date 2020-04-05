import { Component } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';
import { CustomerService } from '@app/_services/customer.service';
import { ThemeService } from '@app/_services/theme.service';
import { NavController, Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';

import { environment } from '@environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss']
})
export class RegisterPage {
    phone: string = '54342';
    firstName: string = '';
    lastName: string = '';
    idDevice: string = '';
    verificationCode: string = '';

    alreadyRegistered = false;
    registrationFormVisible = false;

    recaptchaVerifier;

    environment: any;

    constructor(
        public authService: AuthService,
        private customerService: CustomerService,
        private device: Device,
        private navCtrl: NavController,
        private platform: Platform,
        public themeService: ThemeService
    ) {
        this.environment = environment;
        this.idDevice = this.device.uuid ? this.device.uuid : 'webmobile-brgg';
        if (!environment.production) {
            console.log('Device UUID is: ' + this.idDevice);
        }
    }

    ionViewDidEnter() {

        this.authService.loggedIn.subscribe(status => {
            if (status) {
                this.navCtrl.navigateForward('/home');
            }
        });

        this.authService.verificationCodeSent.subscribe(status => {
            this.registrationFormVisible = status;
        });
    }

    ionViewDidLeave() {
        this.authService.verificationCodeSent.next(false);
    }

    async getCode() {
        const customer = await this.customerService.getByEmail(this.phone).toPromise();

        if (customer) {
            this.firstName = customer.firstName;
            this.lastName = customer.lastName;
            this.idDevice = customer.idDevice ? customer.idDevice : this.device.uuid;
            this.alreadyRegistered = true;
        }

        this.authService.verificationCodeSent.next(false);
        this.authService.verificationId = '';

        const parsedPhone = this.phone.startsWith('+') ? this.phone : '+' + this.phone;

        this.recaptchaVerifier = this.recaptchaVerifier ? this.recaptchaVerifier : this.authService.getVerificationCaptcha();

        if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
            this.authService.getSmsVerificationCode(parsedPhone, this.recaptchaVerifier);
        } else {
            this.authService.getSmsVerificationCodeNative(parsedPhone);
        }
    }

    checkInputs() {
        return !this.firstName || !this.lastName || this.verificationCode.length !== 6;
    }

    resetPhone() {
        this.registrationFormVisible = false;
        this.alreadyRegistered = false;
        this.verificationCode = '';
    }

    clear() {
        this.authService.verificationCodeSent.next(false);
        this.authService.verificationId = '';
    }

    phoneLength(phone) {
        const matcher = /^\d+$/; // Regexp para matchear el teléfono y verificar si todos los caracteres son números.
        return phone.length <= 10 || !matcher.test(phone) || phone.startsWith('549');
    }

    register(alreadyRegistered?: boolean) {
        const userInfo = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.phone,
            idDevice: this.idDevice
        };

        if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
            this.authService.smsAuth(userInfo, this.authService.verificationId, this.verificationCode, alreadyRegistered);
        } else {
            this.authService.smsAuthNative(userInfo, this.authService.verificationId, this.verificationCode, alreadyRegistered);
        }
    }
}
