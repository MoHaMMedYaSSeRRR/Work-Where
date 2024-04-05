import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { take } from 'rxjs/operators'; // Import take operator from rxjs/operators
import { AuthService } from 'src/app/core/Services/auth.service';
import { User } from 'src/app/core/interfaces/auth/user';
import { ConfirmEmail } from 'src/app/core/interfaces/auth/confirmEmail';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit {
  success = true;
  messages: Message[] = [];
  email: string | null = null;
  token: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    console.log('Confirm Email Component initialized');

    await this.authService.user$.pipe(
      take(1)
    ).subscribe((user: User | null) => {
      console.log("in")
      if (user) {
        this.router.navigateByUrl('/');
      } else {

        this.activatedRoute.queryParamMap.subscribe(params => {
          this.email = params.get('email');
          this.token = params.get('token');

          if (this.email && this.token) {
            const confirmEmail: ConfirmEmail = {
              email: this.email,
              token: this.token,
            };
            console.log(confirmEmail)

            this.authService.confirmEmail(confirmEmail).subscribe({
              next: (res: any) => {
                this.messages = [{ severity: 'success', detail: res.value.message }];
              },
              error: (err) => {
                this.success = false;
                console.log(err);
                this.messages = [{ severity: 'error', detail: err.error.message }];
              },
            });
            
          } else {
            console.log('Email or token is missing');

            this.router.navigateByUrl('/');
          }
        });
      }
    });
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }
}
