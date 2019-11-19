import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.page.html",
  styleUrls: ["./contact.page.scss"],
  providers: [InAppBrowser]
})
export class ContactPage implements OnInit {
  pages = [
    { id: "telephone", name: "", subtitle: "", route: "/profile" },
    { id: "whatsapp", name: "", subtitle: "", route: "/coupons", icon: "" },
    {
      id: "instagram",
      name: "",
      subtitle: "",
      route: "/recommended",
      icon: ""
    },
    { id: "facebook", name: "", subtitle: "", route: "/contact", icon: "" }
  ];

  constructor(private inAppBrowser: InAppBrowser) {}

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
    this.inAppBrowser.create("tel:+5493424226598");
  }
  goToWhatsapp() {
    this.inAppBrowser.create("https://wa.me/5493424226598");
  }
  goToInstagram() {
    this.inAppBrowser.create("https://www.instagram.com/brugge.bar.biergarten");
  }
  goToMessenger() {
    this.inAppBrowser.create("https://www.messenger.com/t/133638847237731");
  }
}
