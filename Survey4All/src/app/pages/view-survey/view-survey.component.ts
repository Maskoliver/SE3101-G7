import { SharedService } from './../../services/shared/shared.service';

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
  length = 0;
  userName = "";
  answerTitle: any;
  isSend:boolean=false;
  constructor(private db: FirebaseApp, private fbService: FirebaseService, private auth: AuthService, private sharedService: SharedService) { }


  ngOnInit() {

    this.sharedService.sharedCreator.subscribe(creator => this.userName = creator);
    var user = [];
    this.db.firestore().collection("surveys")
      .doc(this.userName)
      .get()
      .then(doc => {
        user = doc.data()["mySurveys"];
        user.forEach(survey => {
          this.surveys.push(survey);
        })
        this.sharedService.sharedName.subscribe(head => this.surveyName = head);
        for (let i = 0; i < this.surveys.length; i++) {
          if (this.surveys[i].surveyName == this.surveyName) {
            this.qList = this.surveys[i].qList;
          }
        }
      })
  }

  setStatus(indexAnswer: number, indexQuestion: number) {

    var answerList = [];
    answerList = this.qList[indexQuestion].answerList;
    if (this.qList[indexQuestion].qType == "single") {
      for (var k = 0; k < answerList.length; k++) {

        if (k === indexAnswer) {
          console.log(k + " true");
          answerList[k].isSelected = true;
        }
        else {
          console.log(k + " false");
          answerList[k].isSelected = false;
        }
      }
    }
    else {
      answerList[indexAnswer].isSelected = !answerList[indexAnswer].isSelected;
    }


  }

  send() {
    var Survey = { "qList": this.qList, "surveyName": this.surveyName };
    var newResult = [];
    var totalCheck = true;
    for (var z = 0; z < this.qList.length; z++) {
      var a = [];
      a = this.qList[z].answerList;
      var check = false;
      for (var y = 0; y < a.length; y++) {

        if (a[y].isSelected == true) {
          check = true;
        }
      }
      if (check) {

      } else {
        alert("Please fill all of the questions!")
        totalCheck = false;
      }
    }
    if (totalCheck) {
      this.db.firestore().collection("results").doc(this.auth.curUser).get().then(surveyResults => {
        console.log(surveyResults.exists);
        if (surveyResults.exists) {
          newResult = surveyResults.data()['surveyResults'];
          console.log(newResult);
          newResult.push(Survey);
          this.db.firestore().collection("results").doc(this.auth.curUser).update({
            surveyResults: newResult,
          })
          this.isSend=true;
        }
        else {
          var myResult = [];
          myResult.push(Survey);
          this.db.firestore().collection("results").doc(this.auth.curUser).set({
            surveyResults: myResult
          })
          this.isSend=true;
        }

      })
    }
  
  else{
    return;
  }

}

}






