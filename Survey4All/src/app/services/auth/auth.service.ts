import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp, } from "@angular/fire";
import { FirebaseService } from '../firebase/firebase.service';
import * as rx from 'rxjs';
import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  navLoggedIn: boolean;
  isLoggedIn = new rx.BehaviorSubject<boolean>(false);
  curUser: string;
  redirectUrl: string;
  curUserType: string;
  constructor(private router: Router, private firebase: FirebaseApp, private fireauth: AngularFireAuth) {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn.next(true);
        this.navLoggedIn = true;
        this.curUser = this.getUserMail();
        this.firebase.firestore().collection("users").doc(this.curUser).get().then(userInfo => {
          this.curUserType = userInfo.data()['userType'];
        })
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
        }
      } else {
        this.isLoggedIn.next(false);
        this.navLoggedIn = false;
        this.curUser = 'Unregistered';
      }
    })

  }


  getUserMail() {
    const curUser = this.firebase.auth().currentUser;
    if (curUser) {
      return curUser.email;
    }
    return 'Unregistered';
  }

  register(email: string, password: string) {
    return this.firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    this.firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.isLoggedIn.next(true);
      this.navLoggedIn = true;
      this.curUser = this.getUserMail();
      this.firebase.firestore().collection("users").doc(this.curUser).get().then(userInfo => {
        this.curUserType = userInfo.data()['userType'];
      }).then(() => {
        this.router.navigate(['main']);
      })
    }).catch(err => {
      alert(err);
    });
  }
  getUserInfo() {
    return this.firebase.firestore().collection('users').doc(this.curUser);
  }

  logout() {
    this.firebase.auth().signOut().then(() => {
      this.router.navigate(['main']);
      this.curUser = 'Unregistered';
      this.isLoggedIn.next(false);
      this.navLoggedIn = false;
      this.curUserType = "none";
    }).catch(err => {
      alert(err);
    });
    
  }
  contact(name:String,email:String,subject:String,message:String){
      
    }
}
