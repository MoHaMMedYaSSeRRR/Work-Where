import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
slideImg =[
  { src: './assets/images/header.png'},
  { src: './assets/images/header.png'},
  { src: './assets/images/header.png'}
]

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [' ', ' '],
    responsive:{
      0:{
        items: 1,
      }
    }
  }

  cardOption: OwlOptions = {
    loop: true,
    autoplay: false,
    autoplaySpeed: 1000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive:{
      0:{
        items: 1,
      }
    }
  }
}
