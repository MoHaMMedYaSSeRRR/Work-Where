import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, map, of } from 'rxjs';
import { checkEmail } from '../interfaces/auth/checkEmail';
import { User } from '../interfaces/auth/user';
import { register } from '../interfaces/auth/register';
import { ConfirmEmail } from '../interfaces/auth/confirmEmail';
import { ResetPassword } from '../interfaces/auth/resetPassword';
import { Login } from '../interfaces/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSource.asObservable();

  // Update user data and emit through userSubject
  setUser(user: User | null) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }
  constructor(private http: HttpClient, private router : Router) { }

  checkEmail(data: checkEmail): Observable<any>{
    return this.http.post(`${environment.appUrl}/api/authentication/check-email`,data);
  }

  register(data: register): Observable<any>{
    return this.http.post<any>(`${environment.appUrl}/api/authentication/register`,data);
  }


  refreshUser(jwt:string | null){
    if(jwt === null){
      this.userSource.next(null);
      return of(undefined)
    }
    let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer '+ jwt);
    return this.http.get<User>(`${environment.appUrl}/api/authentication/refresh-user-token`,{headers}).pipe(
      map((user: User) =>{
        if(user){

          this.setUser(user);
        }
      })
    )
  }

  confirmEmail(model : ConfirmEmail){
    return this.http.put(`${environment.appUrl}/api/authentication/confirm-email`,model);
  }
  resendEmailConfirmationLink(email : string){
    return this.http.post(`${environment.appUrl}/api/authentication/resend-email-confirmation-link/${email}`, {});
  }

  forgotEmailOrPassword(email : string){
    return this.http.post(`${environment.appUrl}/api/authentication/forgot-email-or-password/${email}`, {});
  }

  resetPassword(model: ResetPassword){
    return this.http.put(`${environment.appUrl}/api/authentication/reset-password`,model)
  }

  getJWT(){

    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user : User = JSON.parse(key);
      return user.data.jwt;
    } else{
      return null;
    }

  }
  login(model: Login){
    return this.http.post<User>(`${environment.appUrl}/api/authentication/login`,model).pipe(
      map((user:User) =>{
        if(user){
          this.setUser(user);
        }
      })
    )
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl("/");
  }

  // private setUser(user :User){
    // localStorage.setItem(environment.userKey, JSON.stringify(user));
    // this.userSource.next(user);
  // }









  // getPhoto() : Observable<any>{
  //   return this.http.get<any>(`${environment.appUrl}/api/authentication/get-photos`);
  // }




}
