import { FirebaseApp } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  surveys = [];
  constructor(private router: Router, private db: FirebaseApp) { }

  ngOnInit() {
    this.db.firestore().collection("surveys").get().then(surveysByUsers => {
      this.surveys = [];
      surveysByUsers.forEach(user => {
        var oneUser = [];
        if (user.data()["mySurveys"]) {
          oneUser = user.data()["mySurveys"];
          oneUser.forEach(survey => {
            this.surveys.push(survey);
          })
        }


        console.log(this.surveys);
      })

    })

  }
  goResults() {
    this.router.navigate(['result']);
  }
}
