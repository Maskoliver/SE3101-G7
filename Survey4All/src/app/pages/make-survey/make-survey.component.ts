import { FirebaseApp } from '@angular/fire';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { firestore } from 'firebase';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-make-survey',
  templateUrl: './make-survey.component.html',
  styleUrls: ['./make-survey.component.scss']
})
export class MakeSurveyComponent implements OnInit {

  qTitle = "";
  qType = "";
  isMultiple = false;
  answerList = [];
  qList = [];
  constructor(private fs: FirebaseApp, private authService: AuthService) {

  }

  ngOnInit() {
  }

  addAnswerPlace() {
    var answer = { "answerTitle": "", "isSelected": false };
    this.answerList.push(answer);
  }

  saveQuestion() {
    if (this.isMultiple) {
      this.qType = 'multiple';
    } else {
      this.qType = 'single';
    }
    var question = { "qType": this.qType, "qTitle": this.qTitle, "answerList": this.answerList };
    this.qList.push(question);
  }

  changeisMultiple(state: string) {

    if (state == 'single') {
      this.isMultiple = false;
    } else {
      this.isMultiple = true;
    }
    console.log(this.isMultiple);
  }

  saveSurvey() {
    var Survey = { "qList": this.qList, "surveyName": "denemeSurvey" };
    var surveys = [];
    this.fs.firestore().collection("surveys").doc(this.authService.curUser).get().then(mySurveys => {
      surveys = mySurveys.data()["mySurveys"];
      console.log(surveys);
      surveys.push(Survey);


      if (this.authService.curUser == 'Unregistered') {
        alert("please log in first");
      } else {
        this.fs.firestore().collection("surveys").doc(this.authService.curUser).update({
          mySurveys: surveys,
        }).then(() => {
          alert("Survey Succesfully added");
        }).catch(err => {
          alert("There is an error : " + err);
        });

      }
    })


  }

}
