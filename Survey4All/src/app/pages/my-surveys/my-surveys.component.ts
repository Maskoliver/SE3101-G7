import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from './../profile/profile.component';
import { SharedService } from 'src/app/services/shared/shared.service';
import { FirebaseApp } from '@angular/fire';

import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-my-surveys',
  templateUrl: './my-surveys.component.html',
  styleUrls: ['./my-surveys.component.scss']
})
export class MySurveysComponent implements OnInit {
  filterText = "";
  surveys = [];
  surveyCreators = [];
  selectedUser = "";
  user = "";
  isFavorite:boolean=false;
  constructor(private router: Router, private db: FirebaseApp, private sharedService: SharedService,private authService: AuthService) { }
  
  goResults() {
    this.router.navigate(['result']);
  }

  ngOnInit() {
    this.db.firestore().collection("surveys").get().then(surveysByUsers => {
      this.surveys = [];
      surveysByUsers.forEach(user => {
        this.user = user.id;
        var oneUser = [];
        if (user.data()["mySurveys"]) {
          oneUser = user.data()["mySurveys"];
          oneUser.forEach(survey => {
            this.surveys.push(survey);
            this.surveyCreators.push(this.user);
          })
        }
      })
    })
  }

}
