import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/Services/auth.service';
import { ResetPassword } from 'src/app/core/interfaces/auth/resetPassword';
import { User } from 'src/app/core/interfaces/auth/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPaswordForm : FormGroup = new FormGroup({});
  token : string | undefined;
  email : string | undefined;
  submitted = false;
  errorMessages : string[] = [];
  messages: Message[] = [];

  constructor(
    private authService : AuthService,
    // private SharedService: SharedService,
    private route: Router,
    private activatedRouter : ActivatedRoute,
    private formBuilder : FormBuilder
  ){}

  ngOnInit() {
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user :User | null) =>{
        if(user){
          this.route.navigateByUrl("/");
        }
        else{
          this.activatedRouter.queryParamMap.subscribe({
            next: (params : any) =>{
              this.token = params.get("token");
              this.email = params.get("email");
              if(this.token && this.email){
                this.initializeForm(this.email);
              } else{
                this.route.navigateByUrl('/login');
              }
            }
          })
        }
      }
    })
  }

  initializeForm(username : string){
    console.log(username)
    this.resetPaswordForm = this.formBuilder.group({
      email : [{value: username, disabled: true}],
      newPassword : ['' , [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$')]]
    })

  }

  resetPassword(){
    this.submitted = true;
    this.errorMessages = [];

    if(this.resetPaswordForm.valid && this.email && this.token){
      const model: ResetPassword ={
        token : this.token,
        email : this.email,
        newPassword : this.resetPaswordForm.get('newPassword')?.value
      };

      this.authService.resetPassword(model).subscribe({
        next: (res : any) =>{
          // this.SharedService.showNotification(true, res.value.title, res.value.message);
          this.messages = [{ severity: 'success', detail: res.message }];
          console.log(res);
            this.route.navigateByUrl('/login')

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
