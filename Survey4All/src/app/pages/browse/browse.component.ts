import { SharedService } from 'src/app/services/shared/shared.service';
import { FirebaseApp } from '@angular/fire';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  filterText = "";
  surveys = [];
  surveyCreators = [];
  surveyCreationDate = [];
  surveyEndingDate = [];
  selectedUser = "";
  user = "";
  isFavorite: boolean = false;
  today: Date;
  startDate:number;
  endDate:Date;
  constructor(private router: Router, private db: FirebaseApp, private sharedService: SharedService, private authService: AuthService) {

  }

  ngOnInit() {
    this.today = new Date();
  //  console.log(this.today);
   this.surveyCreationDate=[];
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
            if (survey.timeCreated) {
              this.surveyCreationDate.push(survey.timeCreated);
            }
            else {
              this.surveyCreationDate.push("");
            }
            for(let i=0;i<this.surveyCreationDate.length;i++){
            // console.log( this.surveyCreationDate[i]);
           this.startDate= this.surveyCreationDate[i];
           this.endDate= new Date(this.startDate + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 90);
           console.log(this.endDate);
            }
       // console.log(this.surveyCreationDate);
          })
        }
      })
    })
  }
  goResults() {
    this.router.navigate(['result']);
  }

  goView(name, user) {
    this.sharedService.goSurvey(name, user);
    var name = name;
    this.router.navigate(['/view-survey'])
  }

  /* addFavoriteSurvey(surveyName:string,user:string){
     this.db.firestore().collection("surveys").doc(user).get().then(mySurveys => {
       var list=mySurveys[0];
       
       
         if(surveyName==list.surveyName){
             list.isFavorite=true;
 
         
         
       }
       mySurveys[0]=list;
       this.db.firestore().collection("surveys").doc("user").update({
         mySurveys
       })
       
       
     })
   }
   deleteFavoriteSurvey(){
     this.isFavorite=false;
     console.log("çıkarıldı")
   }*/
}
