import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Global Componnent/nav-bar/nav-bar.component';
import { FooterComponent } from './Global Componnent/footer/footer.component';
import { NotfoundComponent } from './Global Componnent/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    NotfoundComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
