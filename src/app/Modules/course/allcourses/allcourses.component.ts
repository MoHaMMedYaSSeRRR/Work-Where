import { Course } from 'src/app/core/interfaces/course';
import { CoursesService } from './../../../core/Services/courses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.scss']
})
export class AllcoursesComponent implements OnInit {
  constructor(private _CoursesService:CoursesService) {
  }
  courses:Course[]=[] ;
  ngOnInit(): void {
    this._CoursesService.getAllCourses().subscribe({
      next:(res)=>{this.courses=res
      console.log(this.courses)
      },
      error:(err)=>console.log(err)
    })
  }
  
}
