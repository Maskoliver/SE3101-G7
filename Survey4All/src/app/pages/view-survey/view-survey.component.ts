
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
  answerTitle: any;
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

  setStatus(indexAnswer: number, indexQuestion: number) {
    /*HTML kısmında sadece setstatus diyip çalıştırmıssın burdada this.isSelected == false yapmışssın ama kimin isSelectedi bu ?
    if (this.isSelected == false) {

      this.isSelected = true;
    } else {

      this.isSelected = false;
    }
    Asıl ypaman gerekn bunun indexini almak o indexteki isSelectedi değiştirmek
    Sen şimdi iç içe diye kafan karıştı ama html de iç içe iki for var zaten yani
     hangi sorudason bunu da bilebileceğin bir index var o yüzden 2 indexi de alıyoruz
    */
    console.log(this.qList[indexQuestion]);
    // bak sorumuzu aldık bile :) sadece indexini vermemiz yeterli
    // Soruyu aldıktan sorna bunun answerlistini bölmem gerek
    var answerList = this.qList[indexQuestion].answerList;
    console.log(answerList);
    //E cevaplarımızda geldi ne duruyoruz o zaman ? tek yapmamız gereken şuan sadece booleanı tersine çevirmek
    answerList[indexAnswer].isSelected = !answerList[indexAnswer].isSelected;
    //Burdan sonrasında işte single choicemu multiple mi bunların ayrımını yapmak ve sonra bunları kaydetmek sana kalıyor hadi ben kaçar.

  }
  addAnswerPlace() {
    var answer = { "answerTitle": "", "isSelected": false };
    this.answerList.push(answer);
  }


  
  send() {
  
    var Survey = { "qList": this.qList, "surveyName": this.surveyName };
    var surveyResult = [];
      console.log(surveyResult);
      surveyResult.push(Survey);
    
      this.db.firestore().collection("results").doc(this.auth.curUser).set({
        surveyResult,
   
    })


  }
}







