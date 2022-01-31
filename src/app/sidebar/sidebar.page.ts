import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {

  constructor(private menu: MenuController, private navCtrl: NavController, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {
  }

  closeMenu(){
    this.menu.close();
  }

  goSettings(){
    this.navCtrl.navigateRoot('sidebar/settings');
    this.menu.close();
  }

  goSportMode(){
    this.navCtrl.navigateRoot('sidebar/sport-mode');
    this.menu.close();
  }

  logout(){
    this.storage.set('isUserLoggedIn', false);
    this.navCtrl.navigateRoot('/login');
  }
}
