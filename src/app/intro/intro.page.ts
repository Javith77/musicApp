import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slidesOptions = {
    initialSlide: 0,
    direction: 'horizontal',
    speed: 300,
    spaceBetween: 8,
    slidesPerView: 1,
    freeMode: true,
    loop: true,
  };

  slides: any[];

  constructor(private navController: NavController, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {
    this.fillSlide();
  }

  continue(): void {
    this.storage.set('intro', true);
    this.navController.navigateForward('/login');
  }

  fillSlide(): void {
    this.slides = [
      {
        title: 'Welcome to MusicApp',
        image: 'slide1.png',
        button: false,
      },
      {
        title: 'What is MusicApp?',
        description:
          'The MusicApp to have fun with the best content programmed according to your needs.',
        image: 'slide2.png',
        button: false,
      },
      {
        title: 'Join the musical environment',
        description: 'Everything you need just a click away',
        image: 'slide3.png',
        button: false,
      },
      {
        title: 'Ready to experience?',
        image: 'slide4.png',
        button: true,
      },
    ];
  }
}
