import { FirebaseService } from './../../services/firebase/firebase.service';
import { AuthService } from './../../services/auth/auth.service';
import { FirebaseApp } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import * as rx from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string;
  name: string;
  phone: string;
  photoUrl: string;

  constructor(private fbService: FirebaseService, private authService: AuthService) {

  }

  ngOnInit() {
    const check = rx.interval(900).subscribe(waitLoad => {
      this.loadUserInfo();
    })
    setTimeout(() => check.unsubscribe(), 1000);

  }

  loadUserInfo() {
    this.authService.getUserInfo().get().then(userInfo => {
      this.email = userInfo.data()['email'];
      this.name = userInfo.data()['name'];
      this.phone = userInfo.data()['phone'];
      this.photoUrl = userInfo.data()['photoUrl'];
      console.log(this.photoUrl.length);
      if (this.photoUrl.length) {

      } else {
        this.photoUrl = "https://firebasestorage.googleapis.com/v0/b/survey4all-214cs2018d.appspot.com/o/bad-profile-pic-2-768x768.jpeg?alt=media&token=2269240e-9367-41ca-8cef-c0b661bbee32";
      }
    }).catch(err => {
      alert(err);
    });
  }

}