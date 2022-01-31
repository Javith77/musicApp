import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {

  songs: any[];
  title: string;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ionViewDidEnter(){
    this.songs = this.navParams.data.songs;
    this.title = this.navParams.data.title;
    console.log(this.songs);
  }

  async selectSong(song: any){
    await this.modalController.dismiss(song);
  }

}
