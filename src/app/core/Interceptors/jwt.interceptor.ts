import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.user$.pipe(take(1)).subscribe({
      next: user =>{
        if(user){
          request = request.clone({
          setHeaders:{
            Authorization: `Bearer ${user.data.jwt}`
          }
        })
        }
      }
    })
    return next.handle(request);
  }
}
