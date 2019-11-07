import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { ThemeService } from "@app/_services/theme.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  constructor(
    public authService: AuthService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
