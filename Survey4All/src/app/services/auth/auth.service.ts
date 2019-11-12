import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp, } from "@angular/fire";
import { FirebaseService } from '../firebase/firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private firebase: FirebaseApp, ) {

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
    return this.firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.firebase.auth().signOut().then(() => {
      this.router.navigate(['main']);
    }).catch(err => {
      alert(err);
    });
  }
}
