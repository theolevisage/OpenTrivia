import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(private toastCtlr: ToastController) { }

  async showToast(message: string, header: string, color: string) {
    let toast = await this.toastCtlr.create({
      header: header,
      color: color,
      message: message,
      duration: 3000
    });
    toast.present();
  };
}


