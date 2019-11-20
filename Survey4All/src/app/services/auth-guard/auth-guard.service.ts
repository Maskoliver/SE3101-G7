import { AngularFireAuth } from '@angular/fire/auth';
import * as rx from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private nav: Router, private authService: AuthService) {


  }


  canActivate(state: RouterStateSnapshot, route: ActivatedRouteSnapshot) {

    this.authService.redirectUrl = state.url;
    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.nav.navigate(['/']);
      return false;
    }


  }
}