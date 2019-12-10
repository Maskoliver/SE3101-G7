import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth/auth.service';
import { snapshotChanges } from '@angular/fire/database';

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
  email = "";

  constructor(private db: AngularFirestore, private auth: AuthService) {

    db.collection("surveys").doc("deneme2@deneme.com").get().subscribe(resp => {
      var mySurveys = resp.data()["mySurveys"];
      this.qList = mySurveys[0].qList;
      this.surveyName = mySurveys[0].surveyName;
      this.qList = mySurveys.qList;
      console.log(this.qList)
      this.answerList = this.qList[0].answerList;
      this.qList.forEach(question => {
        var question = question.data();
        var qType = question.data()["qType"];
this.qTypes.push(qType);
var qTitle= question.data()["qTitle"];
this.qTitles.push(qTitle);
console.log(this.qTitles[0])
});

    });


  }




  ngOnInit() {
  }





}

