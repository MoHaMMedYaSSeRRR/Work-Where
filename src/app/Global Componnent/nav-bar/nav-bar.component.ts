import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import {  take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/Services/auth.service';
import { Location } from '@angular/common';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { User } from 'src/app/core/interfaces/auth/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  link: any;
  imgURL : string ="data:image/jpg;base64,";
  constructor(public authService : AuthService, public profileService : ProfileService ,private location: Location,private router : Router ,private renderer: Renderer2 ,private activatedRoute: ActivatedRoute ){}

  ngOnInit(){
    this.authService.user$.subscribe({
      next: (user: User | null) => {
        if(user){
          this.profileService.getUserProfile().subscribe({
            next: (res : any) =>{
              this.imgURL += res.data[0].personalImg;
            },
          })
        }
      },
      error: (err) => {
      }
    });

    // this.authService.user$.pipe(take(1)).subscribe({
    //   next: (user : User | null) =>{
    //     console.log("first")
    //     console.log(user?.data)
    //     if(user){
    //       console.log("user data:" + user)
    //       this.profileService.getUserProfile().subscribe({
    //         next: (res : any) =>{
    //           console.log(res)
    //         },
    //         error: (err) =>{
    //           console.log(err)
    //         }
    //       })

    //     }else{
    //       console.log("no user")
    //     }

    //   }
    // })

    this.link = this.location.path();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.link = event.urlAfterRedirects;
      });




  }

logout(){
  this.authService.logout();
}
}
