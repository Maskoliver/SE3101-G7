import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotChanges } from '@angular/fire/database';
import { FirebaseApp } from '@angular/fire';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  isChosen = false;
  isSelected = false;
  mysurveys = [];
  template: any;
  selected = [];
  qType: String;
  answer: Object;
  answers = [];
  length=0;
  constructor(private db: FirebaseApp, private fbService: FirebaseService, private auth: AuthService) { }


  ngOnInit() {


    var user = [];
    this.db.firestore().collection("surveys")
      .doc("test@gmail.com")
      .get()
      .then(doc => {
        user = doc.data()["mySurveys"];
        user.forEach(survey => {
          this.surveys.push(survey);
        })
        this.qList = this.surveys[0].qList;
        this.surveyName = this.surveys[0].surveyName;
      })
    console.log(this.surveys)
   
   console.log(length)
  }

  setStatus() {
    if (this.isSelected == false) {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }
}







