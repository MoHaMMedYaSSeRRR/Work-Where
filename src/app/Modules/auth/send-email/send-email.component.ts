import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { takeUntil, Subscription, Subject } from 'rxjs'; // Assuming RxJS 6 or above
import {  take } from 'rxjs/operators'; // Assuming RxJS 6 or above
import { AuthService } from 'src/app/core/Services/auth.service';
import { User } from 'src/app/core/interfaces/auth/user';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit{

  emailForm : FormGroup = new FormGroup({});
  submitted = false;
  mode : any;
  errorMessages: string[] = [];
  constructor(
    private authService : AuthService,
    private route: Router,
    private activatedRouter : ActivatedRoute,
    private formBuilder : FormBuilder
  ){}
  ngOnInit(){
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) =>{
        if(user){
          this.route.navigateByUrl('/');
        } else{
          
          this.activatedRouter.paramMap.subscribe((params)=>{
            this.mode = params.get('mode')
            console.log(this.mode)
          })

          if(this.mode){
            this.initializeForm();
          }
          else{
            console.log("invalid mode")
          }
        }

      }
    })

}
  initializeForm(){
    this.emailForm = this.formBuilder.group({
      email : ['' , [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')]],
    })
  }

  sendEmail(){
    this.submitted = true;
    this.errorMessages =[];

    if(this.emailForm.valid && this.mode){
      if(this.mode.includes('resend-email-confirmation-link')){
        this.authService.resendEmailConfirmationLink(this.emailForm.get('email')?.value).subscribe({
          next: (res : any) =>{
            // this.SharedService.showNotification(true, res.value.title, res.value.message);
            this.route.navigateByUrl('/account/login');
          },
          error: (err) =>{
            if(err.error.errors){
              this.errorMessages = err.error.errors;
            }else{
              this.errorMessages.push(err.error)
            }
          }

        })
      } else if(this.mode.includes('forgot-email-or-password')){
        this.authService.forgotEmailOrPassword(this.emailForm.get('email')?.value).subscribe({
          next: (res : any) =>{
            // this.SharedService.showNotification(true, res.value.title, res.value.message);
            this.route.navigateByUrl('/account/login');
          },
          error: (err) =>{
            if(err.error.errors){
              this.errorMessages = err.error.errors;
            }else{
              this.errorMessages.push(err.error)
            }
          }
        })
      }
    }


  }

  cancel(){
    this.route.navigateByUrl('/account/login');
  }



}
