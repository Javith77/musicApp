import { PlayerModalPage } from './../player-modal/player-modal.page';
import { ModalController } from '@ionic/angular';
import { MusicService } from './../services/music.service';
import { Component, OnInit } from '@angular/core';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chipActive: string;
  loading = true;
  newTime: number;
  currentSong: any;

  genres: any[] = [];
  albums: any[] = [];
  categories: any[] = [];
  playlists: any[] = [];
  songs: any[] = [];

  song: any = {
    playing: false,
    name: '',
    previewUrl: '',
  };

  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 3.5,
    freeMode: true,
    loop: true,
  };

  constructor(
    private musicService: MusicService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.musicService.getRecommendationsGenre().subscribe((data) => {
      this.genres = data;
    });

    this.musicService.getPlaylist().subscribe((data) => {
      this.playlists = data;
    });

    this.musicService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.musicService.getNewReleases().subscribe((data) => {
      this.albums = data;
    });
  }

  changeGenre(chip: string) {
      // event.target.setAttribute('color', 'secondary') this is redundant
    this.chipActive = chip;
    this.showModalPlayer();
  }

  async showPlaylistSongs(playlist: any) {
    await this.musicService.getPlaylistTracks(playlist.id).subscribe(async (data) => {
      const tracks = [];
      for (const element of data){
        tracks.push(element.track);
      }
      this.showModalSongs(`Play list - ${playlist.name}`, tracks);
    });
  }

  async showCategorySongs(category: any) {
    await this.musicService.getCategoryTracks(category.id).subscribe(async (data) => {
      console.log(data);
      this.showModalSongs(`Category - ${category.name}`, data);
    });
  }

  async showAlbumSongs(album: any) {
    await this.musicService.getAlbumTracks(album.id).subscribe(async (data) => {
      this.showModalSongs(`Album - ${album.name}`, data);
    });
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    if (!this.song.preview_url) {
      this.song.name = 'Cancion no Disponible';
    } else {
      this.currentSong.play();
      this.currentSong.addEventListener('timeupdate', () => {
        this.newTime =
          (1 / this.currentSong.duration) * this.currentSong.currentTime;
      });
      this.song.playing = true;
    }
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  async showModalSongs(title: string, songs: any) {
    const modal = await this.modalController.create({
      //breakpoints: [0, 0.2, 0.5, 1],
      //initialBreakpoint: 0.2,
      component: SongsModalPage,
      componentProps: {
        title,
        songs,
      },
    });

    modal.onDidDismiss().then((resp) => {
      if (null === resp.data) {
        return;
      }
      if (this.song.playing) {
        this.currentSong.pause();
      }
      this.song = resp.data;
      //autoplay
      this.play();
    });

    return await modal.present();
  }

  async showModalPlayer() {
    const modal = await this.modalController.create({
      component: PlayerModalPage,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
      handle: false,
      cssClass: 'custom-modal'
    });

    modal.onDidDismiss().then((resp) => {
     console.log(resp);
    });

    await modal.present();
  }


  parseTime(time: number) {
    if (time) {
      const partTime = parseInt(time.toString().split('.')[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }
}
