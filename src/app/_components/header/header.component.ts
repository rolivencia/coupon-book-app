import { Component, Input, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";
import { ThemeService } from "@app/_services/theme.service";
import { AuthService } from "@app/_services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() title: string = "BRUGGE";
  @Input() menuVisible: boolean = true;
  @Input() profileVisible: boolean = true;

  constructor(
    private authService: AuthService,
    private menu: MenuController,
    private router: Router,
    public themeService: ThemeService
  ) {}

  openFirst() {
    this.menu.enable(true, "first");
    this.menu.open("first");
  }

  openEnd() {
    this.menu.open("end");
  }

  openCustom() {
    this.menu.enable(true, "custom");
    this.menu.open("custom");
  }

  ngOnInit() {}

  toProfile() {
    this.router.navigate(["profile"]);
  }
}
