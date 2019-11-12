import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  register(name: string, surname: string, email: string, password: string, passwordCheck: string, phone: string) {
    if (name != null) {
      var username = name + surname;
      if (email != null) {
        if (password.length >= 8) {
          if (password == passwordCheck) {
            if (phone != null) {

            }
            else {
              //phone not entered
              alert("Please enter your phone number to sign up");
            }
          }
          else {
            //password not match
          }
        } else {
          //password is not entered or 8 min character rule not completed
        }
      }
      else {
        //email not entered
      }
    } else {
      //name not entered
    }
  }

}
