import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm; // Use ViewChild instead of ViewChildren
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
user={
  username:'',
  email:'',
  secretQuestion:'',
  answer:'',
  gender:''
}
  submitted: boolean;
  suggestUserName() {
    const suggestedName = 'Superuser';
    
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    this.signupForm.form.patchValue({
      userData:{
        username: suggestedName,
      }
    })
  }

  onSubmit() {
    this.submitted= true;
   this.user.username=this.signupForm.value.userData.username;
   this.user.email=this.signupForm.value.userData.email;
   this.user.secretQuestion=this.signupForm.value.userData.secret;
   this.user.answer=this.signupForm.value.userData.questionAnswer;
   this.user.gender=this.signupForm.value.userData.gender;

   this.signupForm.resetForm();
  }
}
