import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/Services/auth.service';
import { User } from 'src/app/core/interfaces/auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit{

  messages: Message[] = [];
  showPassword: boolean = false;
  submitted = false;
  returnUrl : string| null = null;
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router : Router ,
    private activatedRoute: ActivatedRoute
    ) {
      this.authService.user$.pipe(take(1)).subscribe({
        next: (user :User | null) =>{
          if(user){
            this.router.navigateByUrl('/');
          }else{
            this.activatedRoute.queryParamMap.subscribe({
              next: (params : any) =>{
                if(params){
                  this.returnUrl = params.get('returnUrl');
                }
              }
            })
          }

        }
      })
    }

  ngOnInit(): void {
    this.initializeForm();
  }


  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }


  initializeForm(){
    this.loginForm = this.fb.group({
      email : ['' , Validators.required],
      password : ['' , Validators.required]

    })
  }

  login(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value)
    .subscribe({
      next: (res :any) =>{
        if(this.returnUrl){
          this.router.navigateByUrl(this.returnUrl);
        } else{
          this.router.navigateByUrl("/");
          
        }

      },
      error: (err) =>{
        this.messages = [{ severity: 'error', detail: err.error }];
        console.log(err)
      }
    })
    }

  }

  resendEmailConfirmationLink(){
    this.router.navigateByUrl('/authentication/send-email/resend-email-confirmation-link')
  }



}
