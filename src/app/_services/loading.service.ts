import { Injectable } from "@angular/core";
import { LoadingController, NavController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class LoadingService {
  private _loading;

  constructor(private loadingCtrl: LoadingController) {}

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = value;
  }

  public async showLoading(message?: string) {
    this.loading = await this.loadingCtrl.create({
      message: message ? message : "Iniciando sesión..."
    });

    this.loading.present();
  }
}
