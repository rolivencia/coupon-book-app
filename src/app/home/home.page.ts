import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AuthService } from "../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {

  pages = [
    { id: "coupons", name: "Cuponera", subtitle: 'Mirá las promos vigentes', route: '/coupons'},
    { id: "recommended", name: "Recomendados", subtitle: 'Destacados en food & drinks', route: '/recommended'},
    { id: "contact", name: "Contacto y Reservas", subtitle: 'Escribinos en esta sección', route: '/contact'},
    // { id: "profile", name: "Perfil", subtitle: 'Accedé a tu perfil de usuario', route: '/profile'}
  ];

  constructor(
    public authService: AuthService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe(status => {
      if (!status) {
        this.navCtrl.navigateBack("/login");
      }
    });
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }
}
