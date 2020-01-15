import { FirebaseService } from './../../services/firebase/firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from './../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { firestore } from 'firebase';
import * as rx from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  userName = "";
  surveyName = "";
  allSurveys = [];
  answerList = [];
  qList = [];
  qCount = 0;
  surveyRes = [];
  AnswerSheet = [];
  totalSolves = 0;
  constructor(private sharedService: SharedService, private authService: AuthService, private FirebaseService: FirebaseService) { }

  ngOnInit() {
    const check = rx.interval(900).subscribe(waitLoad => {
      this.userName = this.authService.curUser;
      this.sharedService.sharedName.subscribe(head => this.surveyName = head);

      firestore().collection('surveys').doc(this.userName).get().then(mySurvey => {
        this.allSurveys = mySurvey.data()['mySurveys'];
        for (let i = 0; i < this.allSurveys.length; i++) {
          if (this.allSurveys[i].surveyName == this.surveyName) {
            this.qList = this.allSurveys[i].qList;
            this.createSheet(this.qList);
          }
        }
      })
      firestore().collection('results').get().then(user => {
        user.forEach(doc => {
          if (doc.data()["surveyResults"]) {
            this.surveyRes = doc.data()["surveyResults"];
            for (let i = 0; i < this.surveyRes.length; i++) {
              if (this.surveyRes[i].surveyName == this.surveyName) {
                this.totalSolves += 1;
                var myQList = [];
                myQList = this.surveyRes[i].qList;
                this.qCount = myQList.length;
                this.fillSheet(myQList);
                for (let j = 0; j < this.qCount; j++) {
                  this.answerList = myQList[j].answerList;

                }
              }
            }
          }
          else {

          }
        })
      })
    })
    setTimeout(() => check.unsubscribe(), 1000);


  }

  fillSheet(myQList: any[]) {
    var qList = myQList;
    var qCount = 0;
    qCount = qList.length;
    for (let i = 0; i < qCount; i++) {
      var q = qList[i];
      var answerList = [];
      answerList = qList[i].answerList;
      var answerCount = 0;
      answerCount = answerList.length;
      for (let j = 0; j < answerCount; j++) {
        if (answerList[j].isSelected) {
          var answers = this.AnswerSheet[i].answerSheet;
          answers[j] = answers[j] + 1;
          console.log(answers);
        }
      }
    }
  }

  createSheet(qList: any[]) {

    var qCount = 0;
    qCount = qList.length;
    for (let i = 0; i < qCount; i++) {
      var q = qList[i];
      var answerList = [];
      answerList = qList[i].answerList;
      var answerCount = 0;
      answerCount = answerList.length;
      var answerSheet = [];
      for (let j = 0; j < answerCount; j++) {
        answerSheet.push(0);
      }
      var answers = { "answerSheet": answerSheet, "qTitle": q.qTitle }
      this.AnswerSheet.push(answers);
    }

  }





}
