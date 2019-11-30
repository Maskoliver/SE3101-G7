import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private fbService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }



  register(name: string, surname: string, email: string, password: string, passwordCheck: string, phone: string) {
    if (name != null) {
      var username = name +" "+ surname;
      if (email != null) {
        if (password.length >= 8) {
          if (password === passwordCheck) {
            if (phone != null) {
              this.fbService.register(username, password, email, phone);
            }
            else {
              //phone not entered
              alert("Please enter your phone number to sign up");
            }
          }
          else {
            //password not match
            alert("Password not match");
          }
        } else {
          //password is not entered or 8 min character rule not completed
          alert("Password is minimum then 8");
        }
      }
      else {
        //email not entered
        alert("Email not entered");
      }
    } else {
      //name not entered
      alert("name not entered");
    }
  }

}
