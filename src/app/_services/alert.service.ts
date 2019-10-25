import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AlertService {
  private _alert;

  constructor(public alertController: AlertController) {}

  get alert() {
    return this._alert;
  }

  set alert(value) {
    this._alert = value;
  }

  public async show(header?: string, message?: string) {
    this.alert = await this.alertController.create({
      header: header,
      message:
        message,
      buttons: ["Aceptar"]
    });

    await this.alert.present();
  }
}
