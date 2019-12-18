import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseApp } from "@angular/fire";
import { AuthService } from '../auth/auth.service';
import { firestore } from 'firebase';
import { SourceListMap } from 'source-list-map';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private router: Router, private firebase: FirebaseApp, private authService: AuthService) { }


  register(name: string, password: string, email: string, phone: string) {
    var mySurveys = [];
    this.authService.register(email, password).then(user => {
      const uid = user.user.uid.toString();
      const myUsers = firestore().collection('users');
      const newBabe = firestore().collection('surveys');
      const date = new Date();
      const curTime = date.toISOString();
      myUsers.doc(email).set({
        email,
        name,
        phone,
        uid,
        userType: 'user',
        timeCreated: curTime,
        photoUrl: "bad-profile-pic-2-768x768.jpeg"
      }).then(x => {
        newBabe.doc(email).set({
          mySurveys,
        }).then(() => {
          setTimeout(() => {
            this.router.navigate(['main']);
          }, 200)
        })

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
  contact(name: string, email: string, subject: string, message: string) {
    //kullanıcı exist ise şikayetler kullanıcının kendi şikayet arrayine kaydedilir yoksa yeni bir kullanıcı oluştuurlup içine kaydeder
    var complaints = [];
    const incomingMails = firestore().collection('incomingMails');
    this.firebase.firestore().collection("incomingMails").doc(email).get().then(userInfo => {// data okuma yapısı

      if (userInfo.exists) {
        complaints = userInfo.data()['complaints'];
        complaints.push(message);
        incomingMails.doc(email).set({//data yazma yapısı
          complaints,
          email,
          name
        });
      } else {

        complaints.push(message);
        incomingMails.doc(email).set({
          complaints,
          email,
          name
        });
      }

    })


  }

  update(name: string, email: string, phone: string) {

    const myUser = firestore().collection('users');
    myUser.doc(email).update({
      email,
      name,
      phone,
      

    });


  }


  updatePhoto(email:string,photoUrl:string) {

    const myUser = firestore().collection('users');
    myUser.doc(email).update({
      photoUrl
      

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
