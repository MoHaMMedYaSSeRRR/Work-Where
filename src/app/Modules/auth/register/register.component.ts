import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { AuthService } from 'src/app/core/Services/auth.service';
import { checkEmail } from 'src/app/core/interfaces/auth/checkEmail';
import { register } from 'src/app/core/interfaces/auth/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss', '../register/register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInputtwo') fileInputtwo!: ElementRef;

  basicsForm: FormGroup = new FormGroup({});
  verifyForm: FormGroup = new FormGroup({});
  submitted = false;
  verifySubmitted = false;
  errorMessages: string[] = [];
  selectedFile!: File;
  imageFile!: File;
  showPassword: boolean = false;
  currentstep: number = 33.5;
  currentStepIndex: number = 0;
  messages: Message[] = [];
  items = [{ label: 'Basics' }, { label: 'Verify' }, { label: 'Confirm' }];

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit() {
    this.currentStepIndex = Math.max(
      0,
      Math.min(this.currentStepIndex, this.items.length - 1)
    );
    this.initializeForm();
  }

  nextStep() {
    this.errorMessages = [];
    if (this.currentStepIndex < this.items.length - 1) {
      if (this.currentStepIndex == 0) {
        this.submitted = true;
        if (this.basicsForm.valid) {
          const basicsFormData: checkEmail = {
            email: this.basicsForm.get('email')?.value,
            nId: this.basicsForm.get('nId')?.value,
          };

          console.log(basicsFormData);
          this.authService.checkEmail(basicsFormData).subscribe({
            next: (res: any) => {
              this.currentstep += 33.5;
              this.currentStepIndex++;
              this.messages = [];
            },
            error: (err) => {
              this.messages = [{ severity: 'error', detail: err.error }];
            },
          });
        }
      } else if (this.currentStepIndex == 1) {
        this.verifySubmitted = true;
        if (this.verifyForm.valid) {
          this.currentstep += 33.5;
          this.currentStepIndex++;
        }
      }
    }
  }

  prevStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.currentstep -= 33.5;
    }
  }

  initializeForm() {
    this.basicsForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,}$'
          ),
        ],
      ],
      nId: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
    });
    this.verifyForm = this.fb.group({
      personalImg: [null, [Validators.required]],
      nImg: [null, [Validators.required]],
    });
  }
  onFileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(event.target.id);
    if (this.selectedFile) {
      this.fileInput.nativeElement.textContent = this.selectedFile.name;
    } else {
      this.fileInput.nativeElement.textContent = 'Choose Personal Image'; // Reset if no file selected
    }
  }

  onImageUpload(event: any) {
    this.imageFile = event.target.files[0];
    console.log(this.imageFile);
    console.log(event.target.id);
    if (this.imageFile) {
      this.fileInputtwo.nativeElement.textContent = this.imageFile.name;
    } else {
      this.fileInputtwo.nativeElement.textContent = 'Choose National ID Image'; // Reset if no file selected
    }
  }

  async onSubmit() {
    this.submitted = true;
    const formData: register = {
      'firstName': this.basicsForm.get('firstName')?.value,
      'lastName': this.basicsForm.get('lastName')?.value,
      'email': this.basicsForm.get('email')?.value,
      'password': this.basicsForm.get('password')?.value,
      'phoneNumber': this.basicsForm.get('phoneNumber')?.value,
      'nId': this.basicsForm.get('nId')?.value,
      'personalImg': this.selectedFile ? await this.convertToBase64(this.selectedFile) : '',
      'nImg': this.imageFile ? await this.convertToBase64(this.imageFile) : ''
    };
    if (this.basicsForm.invalid || this.verifyForm.invalid) {
      this.errorMessages.push('Please fix the errors in the form.');
      return; // Prevent sending invalid data
    }

    return formData; // Return valid data only
  }

 async register() {
    const data = await this.onSubmit();
    console.log(data)
    if (data) {
      this.authService.register(data).subscribe({
        next: (res: any) => {
          if (this.currentStepIndex == 1) {
            this.verifySubmitted = true;
            if (this.verifyForm.valid) {
              this.currentstep += 33.5;
              this.currentStepIndex++;
            }
          }
        },
        error: (err) => {
          this.messages = [{ severity: 'error', detail: err.error }];
          if (err.error.errors) {
            this.errorMessages = err.error.errors;
          } else {
            this.errorMessages.push(err.error);
          }
        },
      });
    }

  }
// imgurl : string| undefined;
//   Show(){
//     this.authService.getPhoto().subscribe({
//       next: (res : any) => {
//         console.log(res)
//         this.imgurl = res.data[0].url;

//       },
//       error : err =>{
//         console.log(err)
//       }
//     })
//   }


  async convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('Failed to read file as Base64.');
        }
      };
      reader.onerror = () => {
        reject('Failed to read file as Base64.');
      };
      reader.readAsDataURL(file);
    });
  }
}
