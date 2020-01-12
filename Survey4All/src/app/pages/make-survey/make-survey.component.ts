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
  qTitleEdit = "";
  qType = "";
  qTypeEdit = "";
  isMultiple = false;
  isMultipleEdit = false;
  answerList = [];
  answerListEdit = [];
  surveyName = "";
  qList = [];
  edittedIndex = -1;
  isSaved:boolean=false;
  constructor(private fs: FirebaseApp, private authService: AuthService) {

  }

  ngOnInit() {
  }

  addAnswerPlace() {
    var answer = { "answerTitle": "", "isSelected": false };
    this.answerList.push(answer);
  }
  addAnswerPlaceEdit() {
    var answer = { "answerTitle": "", "isSelected": false };
    this.answerListEdit.push(answer);
  }

  removeAnswerPlace(index: number) {
    this.answerList.splice(index, 1);
  }
  removeAnswerPlaceEdit(index: number) {
    this.answerListEdit.splice(index, 1);
  }

  saveQuestion() {
    if (!this.qTitle) {
      alert("You have to enter a title for your question");
    } else if (this.answerList.length <= 1) {

      alert("You have to add at least 2 answers for the question");
    } else {
      var checkIfAnswersHERE = true;
      for (let i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i].answerTitle == "") {
          checkIfAnswersHERE = false;
        }
      }
      if (checkIfAnswersHERE) {
        if (this.isMultiple) {
          this.qType = 'multiple';
        } else {
          this.qType = 'single';
        }
        var question = { "qType": this.qType, "qTitle": this.qTitle, "answerList": this.answerList };
        this.qList.push(question);

        this.qTitle = "";
        this.answerList = [];
        this.isMultiple = false;
      } else {
        alert("Answers can not be blank space");
      }

    }
  }

  saveEdittedQuestion() {
    if (!this.qTitleEdit) {
      alert("You have to enter a title for your question");
    } else if (this.answerListEdit.length <= 1) {
      alert("You have to add at least 2 answers for the question");
    } else {
      var checkIfAnswersHERE = true;
      for (let i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i].answerTitle == "") {
          checkIfAnswersHERE = false;
        }
      }
      if (checkIfAnswersHERE) {
        if (this.isMultipleEdit) {
          this.qTypeEdit = 'multiple';
        } else {
          this.qTypeEdit = 'single';
        }
        var question = { "qType": this.qTypeEdit, "qTitle": this.qTitleEdit, "answerList": this.answerListEdit };
        if (this.edittedIndex >= 0) {
          this.qList[this.edittedIndex] = question;
        } else {
          alert("something wr-rong beep boop");
        }


        this.qTitleEdit = "";
        this.answerListEdit = [];
        this.isMultipleEdit = false;
      } else {
        alert("Answers can not be blank space");
      }
    }
  }

  removeQuestion(index) {
    this.qList.splice(index, 1);
  }

  editQuestion(index: number) {
    this.edittedIndex = index;
    this.answerListEdit = this.qList[index].answerList;
    this.qTitleEdit = this.qList[index].qTitle;
    if (this.qList[index].qType == 'single') {
      this.isMultiple = false;
    } else {
      this.isMultiple = true;
    }
  }

  changeisMultiple(state: string) {

    if (state == 'single') {
      this.isMultiple = false;
    } else {
      this.isMultiple = true;
    }
  }

  changeisMultipleEdit(state: string) {

    if (state == 'single') {
      this.isMultipleEdit = false;
    } else {
      this.isMultipleEdit = true;
    }

  }
  saveSurvey() {
    if (!this.surveyName) {
      alert("You have to enter a name for your Survey");
    }
    else if (this.qList.length == 0) {
      alert("You have to add at least 1 question for your Survey");
    }
    else {
      var Survey = { "qList": this.qList, "surveyName": this.surveyName };
      var surveys = [];
      this.fs.firestore().collection("surveys").doc(this.authService.curUser).get().then(mySurveys => {
        surveys = mySurveys.data()["mySurveys"];
        surveys.push(Survey);


        if (this.authService.curUser == 'Unregistered') {
          alert("please log in first");
        } else {
          this.fs.firestore().collection("surveys").doc(this.authService.curUser).update({
            mySurveys: surveys,
          }).then(() => {
            alert("Survey Succesfully added");
            this.qList = [];
            this.qTitle = "";
            this.surveyName = "";
            this.isSaved=true;
          }).catch(err => {
            alert("There is an error : " + err);
          });

        }
      })

    }
  }

}
