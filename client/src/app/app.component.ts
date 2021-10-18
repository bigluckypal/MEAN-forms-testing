import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

  userModel = new User('Hello', 'world', true, 'hello@world.com', true, 1234567890, 'default');

  visions = [];
  // class member to hold select option error state
  topicHasError = true;

  // to check form submitted or not
  isFormSubmitted = false;

  email_disabled = false;
  phone_disabled = false;
  // select option validation
  validateChoosenTopic(curValue) {
    if (curValue === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  // checkbox event
  checkValue_email(checked){
    if (checked == 1) {
      this.email_disabled = false;
    } else {
      this.email_disabled = true;
    }
  }

  checkValue_phone(checked){
    if (checked == 1) {
      this.phone_disabled = false;
    } else {
      this.phone_disabled = true;
    }
  }

  // create a new data member/property to bind to the view
  errorMessage = '';

  constructor(public enrollmentService: EnrollmentService) { }



  ngOnInit() {
    this.enrollmentService.send_supervision_request().subscribe((data: any[])=>{
      console.log(data);
      this.visions = data;
    })
  }

  // handler for submit button
  onSubmit() {
    console.log('submit button clicked');

    if (this.email_disabled) {
      this.userModel.email = '';      
    }
    if (this.phone_disabled) {
      this.userModel.phoneNumber = null;      
    }

    delete this.userModel.subscribe_email;
    delete this.userModel.subscribe_phone;

    this.isFormSubmitted = true;
    this.enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => this.errorMessage = error.statusText
      )
  }

}
