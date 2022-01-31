import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { MapsAPILoader, AgmMap } from '@agm/core';
@Component({
  selector: 'app-sport-mode',
  templateUrl: './sport-mode.page.html',
  styleUrls: ['./sport-mode.page.scss'],
})
export class SportModePage implements OnInit {
  currentCenter: any;
  coordinates: any[] = [];
  defaultZoom = 15;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }

  watchPosition(){
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }

  goHome() {
    this.navCtrl.navigateBack('sidebar/home');
  }


}
