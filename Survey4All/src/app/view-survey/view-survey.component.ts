import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss']
})
export class ViewSurveyComponent implements OnInit {

  qTitle = "";
  qType = "";
  isMultiple = false;
  answerList = [];
  qList = [];
  surveyName="";
  email="";
  constructor(private db:AngularFirestore, private authService:AuthService ) {
  }
  ngOnInit() {
  }


}
