import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/core/interfaces/course';
import { CoursesService } from 'src/app/core/Services/courses.service';

@Component({
  selector: 'app-coursedetais',
  templateUrl: './coursedetais.component.html',
  styleUrls: ['./coursedetais.component.scss']
})
export class CoursedetaisComponent implements OnInit {
  course:Course = {} as Course;
  courseId:any =0
  selectedDate = new Date();
  constructor(private _CoursesService:CoursesService , private _ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params)=>{
      this.courseId = params.get('id')
      console.log(this.courseId)
    })
    this._CoursesService.getCourseDetails(this.courseId).subscribe({
      next:(res)=>{
        this.course = res
        console.log(this.course)
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
}
