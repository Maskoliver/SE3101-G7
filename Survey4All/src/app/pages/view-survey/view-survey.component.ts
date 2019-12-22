import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import { FirebaseApp } from '@angular/fire';
import { FirebaseService } from './../../services/firebase/firebase.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {

  qTitles = [];
  qTypes = [];
  isMultiple = false;
  answerList = [];
  qList = [];
  surveyName = "";
  qTitle = "";
  email: string;
  surveys = [];
  isSubmitted: boolean;
  templateUnchecked = false;
  templateChecked = true;
  isSelected = false;

  template: any;

  constructor(private db: FirebaseApp, private fbService: FirebaseService, private auth: AuthService) { }


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

      })
      this.qList = this.surveys[0].qList;
      this.surveyName = this.surveys[0].surveyName;
      console.log(this.qList);
    })
  }


  getCheckboxesValue() {
    console.log('ngModel value', this.isSelected);
  }

  updtselection() {
    this.db.firestore().collection("surveys").doc("admin@survey4all").update({
      "isSelected": true,
    });
  }
}






