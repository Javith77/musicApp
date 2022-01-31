import { AlertController, MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  photo: SafeResourceUrl;
  user: any;

  constructor(
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.user = await this.storage.get('user');
  }

  goHome() {
    this.navCtrl.navigateBack('sidebar/home');
  }

  async takePhoto(option: number) {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: option === 0 ? CameraSource.Photos : CameraSource.Camera,
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }

  async alertChooseOption() {
    const alert = await this.alertController.create({
      header: 'Upload profile image',
      message: 'Select an option!',
      buttons: [
        {
          text: 'Galery',
          cssClass: 'secundary',
          handler: () => {
            this.takePhoto(0);
          },
        },
        {
          text: 'Camera',
          cssClass: 'primary',
          handler: () => {
            this.takePhoto(1);
          },
        },
      ],
    });
    await alert.present();
  }
}
