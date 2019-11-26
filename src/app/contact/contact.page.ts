import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.page.html",
  styleUrls: ["./contact.page.scss"],
  providers: [InAppBrowser]
})
export class ContactPage implements OnInit {
  pages = [
    { id: "telephone", name: "", subtitle: "", route: "" },
    { id: "whatsapp", name: "", subtitle: "", route: "", icon: "" },
    {
      id: "instagram",
      name: "",
      subtitle: "",
      route: "",
      icon: ""
    },
    { id: "facebook", name: "", subtitle: "", route: "", icon: "" }
  ];

  constructor(private inAppBrowser: InAppBrowser, private platform: Platform) {}

  ngOnInit() {}

  goTo(appId) {
    switch (appId) {
      case "telephone":
        this.goToPhone();
        break;
      case "whatsapp":
        this.goToWhatsapp();
        break;
      case "instagram":
        this.goToInstagram();
        break;
      case "facebook":
        this.goToMessenger();
        break;
    }
  }

  goToPhone() {
    this.inAppBrowser.create("tel:+543424226598");
  }
  goToWhatsapp() {
    if (this.platform.is("android")) {
      window.open('whatsapp://send?phone=5493424226598"', "_system");
    } else {
      this.inAppBrowser.create("https://wa.me/5493424226598");
    }
  }
  goToInstagram() {
    if (this.platform.is("android")) {
      window.open("https://www.instagram.com/brugge.bar.biergarten", "_system");
    } else {
      this.inAppBrowser.create(
        "https://www.instagram.com/brugge.bar.biergarten"
      );
    }
  }
  goToMessenger() {
    if (this.platform.is("android")) {
      window.open("https://www.messenger.com/t/133638847237731", "_system");
    } else {
      this.inAppBrowser.create("https://www.messenger.com/t/133638847237731");

    }
  }
}
