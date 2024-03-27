import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/core/Services/courses.service';

@Component({
  selector: 'app-allcoursereview',
  templateUrl: './allcoursereview.component.html',
  styleUrls: ['./allcoursereview.component.scss']
})
export class AllcoursereviewComponent {
  constructor(private _CoursesService:CoursesService) {
      // console.log(this.userID)
   }
  isReview : boolean = true;
  isLoading : boolean = false;
  // userID :any =this._CoursesService.userData.id;

  addReview:FormGroup = new FormGroup ({
    userId: new FormControl(null),
    courseId:new FormControl(null) ,
    rating: new FormControl(null, [Validators.required, Validators.pattern('^(?:[1-4](?:\.[0-9])?|5)$')]),
    review: new FormControl(null)
  })
  
  submitReview(form :FormGroup ){
    console.log(form.value);
  }
}
