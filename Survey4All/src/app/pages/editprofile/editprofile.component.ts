import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase/firebase.service';
import { AuthService } from './../../services/auth/auth.service';

import * as rx from 'rxjs';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  submitClick:boolean=true;
  photoClick:boolean=true;
  photoUrl:String;
  photo:File=null;
  username:String[];
  getUsername:String;
  name:String;
  surname:String;
  email:String;
  phone:String;
  //password:

  constructor(private fbService: FirebaseService,private authService: AuthService) { }

  ngOnInit() {
    const check = rx.interval(600).subscribe(waitLoad => {
    this.loadUserInfo();
  })
  setTimeout(() => check.unsubscribe(), 700);

  
  }
  
  updatePhoto(event){
    this.photo=<File>event.target.files[0];
  }
  
  resetPassword(email: string) {
    this.authService.resetPassword(email);
  }
  loadUserInfo() {
    this.authService.getUserInfo().get().then(userInfo => {
      this.email = userInfo.data()['email'];
      this.getUsername = userInfo.data()['name'];
      this.phone = userInfo.data()['phone'];
      this.photoUrl=userInfo.data()['photoUrl'];
      this.username=this.getUsername.split(" ",2);
      this.name=this.username[0];
      this.surname=this.username[1];
    }).catch(err => {
      alert(err);
    });
    
  }
  update(name:string,surname:string,email:string,phone:string){
    var username=name+" "+surname;
    this.fbService.update(username,email,phone);
    this.submitClick=false;
  }

}
