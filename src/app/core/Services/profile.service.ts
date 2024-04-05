import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private router : Router) { }

  getUserProfile(): Observable<any>{
    return this.http.get<any>(`${environment.appUrl}/api/account/profile`)
  }



}
