import { Injectable } from '@angular/core';
import { FirebaseAuth, FirebaseApp } from "@angular/fire";
import { CanActivate, Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private nav: Router, private db: AngularFirestore) { }
}
