import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcoursesComponent } from './allcourses/allcourses.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CoursedetaisComponent } from './coursedetais/coursedetais.component';

const routes: Routes =[
  {path: '', redirectTo: '/allcourses' , pathMatch:'full'},
  {path: 'allcourses', component: AllcoursesComponent },
  {path: 'addcourse',component: AddcourseComponent},
  {path: 'coursedetails/:id',component: CoursedetaisComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
