import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/Services/auth.service';
import { ProfileService } from 'src/app/core/Services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public profileService : ProfileService){}
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (res : any) =>{
        console.log(res)
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }



}
