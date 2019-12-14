import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase/firebase.service';
import { AuthService } from './../../services/auth/auth.service';
import {Upload} from 'src/app/uploads/shared//upload';
import * as rx from 'rxjs';
import { UploadService } from 'src/app/uploads/shared/upload.service';
import * as _ from "lodash";
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  submitClick:boolean=true;
  photoClick:boolean=true;
  photoUrl:string;
  photo:File=null;
  username:String[];
  getUsername:String;
  name:String;
  surname:String;
  email:string;
  phone:String;
  namePhoto:string;
  //password:
  selectedFiles: FileList;
  currentUpload: Upload;
  constructor(private fbService: FirebaseService,private authService: AuthService,private upSvc: UploadService) { }

  ngOnInit() {
    const check = rx.interval(600).subscribe(waitLoad => {
    this.loadUserInfo();
    
  })
  setTimeout(() => check.unsubscribe(), 700);
  
  
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
}
  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    
    this.authService.getUserInfo().get().then(userInfo => {
      this.namePhoto=userInfo.data()['email'];
    });
    this.upSvc.pushUpload(this.currentUpload,this.namePhoto)
  }
  
  resetPassword(email: string) {
    this.authService.resetPassword(email);
  }
  loadUserInfo() {
    const storageRef = firebase.storage().ref().child('uploads/'+this.email+"/");
    this.authService.getUserInfo().get().then(userInfo => {
      this.email = userInfo.data()['email'];
      this.getUsername = userInfo.data()['name'];
      this.phone = userInfo.data()['phone'];
      this.photoUrl=userInfo.data()['photoUrl'];
      this.username=this.getUsername.split(" ",2);
      this.name=this.username[0];
      this.surname=this.username[1];
      this.namePhoto=this.email;//email ismiyle fotoğrafı yükleyen satır
      //this.photoUrl=storageRef.toString();
      this.upSvc.getProfileImageUrl(this.email,this.namePhoto)
      
      //console.log(this.photoUrl)
    }).catch(err => {
      alert(err);
    });
    
  }
  update(name:string,surname:string,email:string,phone:string){
    var username=name+" "+surname;
    this.fbService.update(username,email,phone,);
    this.loadUserInfo();
    this.submitClick=false;
  }
  
}
