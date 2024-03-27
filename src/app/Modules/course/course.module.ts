import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseRoutingModule } from './course-routing.module';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { CoursedetaisComponent } from './coursedetais/coursedetais.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { EditcourseComponent } from './editcourse/editcourse.component';
import { AllcoursereviewComponent } from './allcoursereview/allcoursereview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';




@NgModule({
  declarations: [
    AllcoursesComponent,
    CoursedetaisComponent,
    AddcourseComponent,
    EditcourseComponent,
    AllcoursereviewComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule ,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
    ]
})
export class CourseModule { }
