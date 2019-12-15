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
  photoUrl:string;

  constructor(private fbService: FirebaseService, private authService: AuthService) {

  }

  ngOnInit() {
    const check = rx.interval(600).subscribe(waitLoad => {
      this.loadUserInfo();
    })
    setTimeout(() => check.unsubscribe(), 700);

  }

  loadUserInfo() {
    this.authService.getUserInfo().get().then(userInfo => {
      this.email = userInfo.data()['email'];
      this.name = userInfo.data()['name'];
      this.phone = userInfo.data()['phone'];
      this.photoUrl=userInfo.data()['photoUrl'];
    }).catch(err => {
      alert(err);
    });
  }

}