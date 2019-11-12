import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp } from "@angular/fire";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private router: Router, private firebase: FirebaseApp) { }
}
