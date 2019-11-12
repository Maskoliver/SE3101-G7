import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp, } from "@angular/fire";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private firebase: FirebaseApp) {

  }

  getUserMail() {
    const curUser = this.firebase.auth().currentUser;
    if (curUser) {
      return curUser.email;
    }
    return "Unregistered";
  }
}
