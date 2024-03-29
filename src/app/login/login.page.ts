import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { LoadingService } from '@app/_services/loading.service';
import { ThemeService } from '@app/_services/theme.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    public logo: string = 'logo-white';
    public backgroundColor: string = 'white';

    constructor(
        public authService: AuthService,
        private navCtrl: NavController,
        private loadingService: LoadingService,
        public themeService: ThemeService
    ) {}

    async ngOnInit() {
        await this.loadingService.showLoading();

        this.authService.loggedIn.subscribe(
            status => {
                this.loadingService.loading.dismiss();

                if (status) {
                    this.navCtrl.navigateForward('/home');
                }
            },
            error => {
                this.loadingService.loading.dismiss();
            }
        );

        this.logo = this.themeService.currentTheme.logo;
        this.backgroundColor = this.themeService.currentTheme.color;
    }

    async login(platform?) {
        this.navCtrl.navigateForward('/register');
    }
}
