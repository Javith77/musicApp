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
    slidesPerView: 1.5,
    freeMode: true,
    loop: true,
  };

  slides: any[];

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {
    // this.storage.get('intro').then((val) => {
    //   if (val) {
    //     this.router.navigateByUrl('/home');
    //   }
    // });
    this.fillSlide();
  }

  continue(): void {
    this.storage.set('intro', true);
    this.router.navigateByUrl('/home');
  }

  fillSlide(): void {
    this.slides = [
      {
        title: 'Welcome',
        description:
          'The MusicApp is a coordinated development practice for a seminar.',
        image: 'slide1.jpg',
        button: false,
      },
      {
        title: 'What is MusicApp?',
        description:
          'The MusicApp to have fun with the best content programmed according to your needs.',
        image: 'slide2.jpg',
        button: false,
      },
      {
        title: 'Ready to experience?',
        image: 'slide3.jpg',
        button: true,
      },
    ];
  }
}
