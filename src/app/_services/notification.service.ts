import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  get appId(): string {
    return this._appId;
  }

  get authKey(): string {
    return this._authKey;
  }

  get senderId(): string {
    return this._senderId;
  }

  private _appId: string = "4a964c0f-a974-493d-bde6-2b3d784828fc";
  private _authKey: string = "MDFlN2NjNjctMGY1MC00ZTVmLThhOTEtMWJmZTI3NDI4YzFk";
  private _senderId: string = "287785352097";

  constructor(private oneSignal: OneSignal) { }

  init(){
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit(this.appId, this.senderId);

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    // const alert = await this.alertCtrl.create({
    //   header: title,
    //   subHeader: msg,
    //   buttons: [
    //     {
    //       text: `Action: ${task}`,
    //       handler: () => {
    //         // E.g: Navigate to a specific screen
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }
}
