import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ConfirmEmailComponent,
    SendEmailComponent,
    ResetPasswordComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StepsModule,
    ProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    MessagesModule


  ]
})
export class AuthModule { }
