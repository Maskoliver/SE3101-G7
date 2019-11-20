import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp } from "@angular/fire";
import { AuthService } from '../auth/auth.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private router: Router, private firebase: FirebaseApp, private authService: AuthService) { }


  register(name: string, password: string, email: string, phone: string) {
    this.authService.register(email, password).then(user => {
      const uid = user.user.uid.toString();
      const myUsers = firestore().collection('users');
      const date = new Date();
      const curTime = date.toISOString();
      myUsers.doc(email).set({
        email,
        name,
        phone,
        uid,
        userType: 'user',
        timeCreated: curTime
      }).then(x => {
        setTimeout(() => {
          this.router.navigate(['main']);
        }, 200)
      }
      ).catch(
        error => {
          alert('Üyelik oluşturulamadı')
        })
    }).catch(err => {
      alert(err);
    });

  }

  logout() {
    this.authService.logout();
  }
  contact(name:string,email:string,subject:string,message:string){
      //this.authService.contact(name,email,subject,message)
      //eski array ile yeni arryi join yap!!
      var complaints=[];
      complaints.push(message);
      console.log(message)
      const incomingMails=firestore().collection('incomingMails');
      incomingMails.doc(email).set({
       complaints,
       email,
       name
      });
      
  }


  getUserMail() {
    const mail = this.authService.getUserMail();
    if (mail) {
      return mail;
    } else {
      return "No User";
    }
  }
}
