import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp, } from "@angular/fire";
import { FirebaseService } from '../firebase/firebase.service';
import * as rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  navLoggedIn: boolean;
  isLoggedIn = new rx.BehaviorSubject<boolean>(false);
  curUser: string;
  redirectUrl: string;
  constructor(private router: Router, private firebase: FirebaseApp, private fireauth: AngularFireAuth) {
    this.fireauth.authState.subscribe((user) => {
      if (user) {
        this.isLoggedIn.next(true);
        this.navLoggedIn = true;
        this.curUser = this.getUserMail();
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
      this.router.navigate(['main']);
      this.isLoggedIn.next(true);
      this.navLoggedIn = true;
      this.curUser = this.getUserMail();
    }).catch(err => {
      console.log(err);
    });
  }

  logout() {
    this.firebase.auth().signOut().then(() => {
      this.router.navigate(['main']);
      this.curUser = 'Unregistered';
      this.isLoggedIn.next(false);
      this.navLoggedIn = false;
    }).catch(err => {
      alert(err);
    });
  }
}
