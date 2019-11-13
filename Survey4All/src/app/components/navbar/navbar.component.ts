import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../../services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import * as rx from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  curUser: string;
  constructor(private fbService: FirebaseService, private router: Router, private authService: AuthService) {

  }

  logout() {
    this.fbService.logout();
    this.curUser = "Unregistered";

  }

  ngOnInit() {
    this.curUser = this.fbService.getUserMail();
  }

  goProfile() {
    this.router.navigate(['profile']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }

  goSignUp() {
    this.router.navigate(['register']);
  }

  goContact() {
    this.router.navigate(['contact']);
  }

  goMain() {
    this.router.navigate(['main']);
  }

}
