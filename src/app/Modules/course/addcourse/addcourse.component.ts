import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from 'src/app/core/Services/courses.service';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  constructor(private _CoursesService:CoursesService){ }
  ngOnInit(): void {
     this.addcourse.controls['TeacherId'].setValue(this.userID)
    }

  userID =this._CoursesService.userData.id;
  isInRoom :boolean =false
  roomsOptions=[{
    name:'mody',
    id:120
  },
  {
    name:'ahmed',
    id:50
  }];
  selectedOption:string='';

  addcourse:FormGroup = new FormGroup ({
    Name: new FormControl(null),
    PictureUrl: new FormControl(null),
    Price : new FormControl(null),
    Capacity: new FormControl(null),
  Location: new FormControl(null),
    IsInplace: new FormControl(null),
    TeacherId: new FormControl(null),
    Description: new FormControl(null),
    Num_Of_Students_Joined: new FormControl(null),
   RoomId:new FormControl(null)
  })
  onAddCourse(form : FormGroup){
    console.log(form.value);
    this._CoursesService.addCourse(form.value).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.log(err)
    })
   
  }
  togglePriceField() {
    this.isInRoom = !this.isInRoom;
  }

  onOptionSelect(event: any) {
    this.selectedOption = event?.target?.value ?? null;
    if (this.selectedOption == 'other') {
       this.addcourse.controls['IsInplace'].setValue(false);
      this.isInRoom = true;
       this.addcourse.controls['RoomId'].setValue(1);
    } else {
       this.addcourse.controls['IsInplace'].setValue(true);
      const selectedroom = this.roomsOptions.find(option => option.name === this.selectedOption);
      if (selectedroom) {
         this.addcourse.controls['RoomId'].setValue(selectedroom.id);
        this.isInRoom = false;
      }
    }
  }
}
