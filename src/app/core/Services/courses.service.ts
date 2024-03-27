import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _HttpClient:HttpClient) { 
     this.getUserData()
  }

    userData:any ;
  getAllCourses():Observable<any>
  {
    return this._HttpClient.get(`https://localhost:7069/api/Course`);
  }

  getUserData(){
  const decodedToken :any = localStorage.getItem('userToken')
   const endodedToken = jwtDecode(decodedToken) 
   this.userData = endodedToken;
    
   }  
  addCourse(data :any):Observable<any>
  {
    return this._HttpClient.post(`https://localhost:7069/api/Course`,data);
  }
  getCourseDetails(id : number):Observable<any>
  {
    return this._HttpClient.get(`https://localhost:7069/api/Course/${id}`);
  }
}
