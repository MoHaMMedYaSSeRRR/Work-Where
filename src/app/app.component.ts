import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService : AuthService){}
  ngOnInit(): void {
    console.log("app init")
    this.refreshUser();
  }
  private refreshUser(){

    const jwt = this.authService.getJWT();

    if(jwt){
      this.authService.refreshUser(jwt).subscribe({
        next: _ =>{},
        error: _ =>{
          this.authService.logout();
        }

      })
    }else{
      this.authService.refreshUser(null).subscribe();
    }
  }
  title = 'Work Where';
}
