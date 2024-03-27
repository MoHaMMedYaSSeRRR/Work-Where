import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    ContactusComponent  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    SlickCarouselModule
  ]
})
export class HomeModule { }
