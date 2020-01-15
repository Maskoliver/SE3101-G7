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
  selectedUser = "";
  user = "";
  isFavorite: boolean = false;
  isSolved = [];
  resultSet = [];
  constructor(private router: Router, private db: FirebaseApp, private sharedService: SharedService, private authService: AuthService) {

  }

  ngOnInit() {
    this.db.firestore().collection("surveys").get().then(surveysByUsers => {
      this.surveys = [];
      this.solvedSurveys();

      surveysByUsers.forEach(user => {
        this.user = user.id;
        var oneUser = [];
        if (user.data()["mySurveys"]) {
          oneUser = user.data()["mySurveys"];
          oneUser.forEach(survey => {
            var check = true;
            for (let index = 0; index < this.resultSet.length; index++) {
              if (this.resultSet[index] == survey.surveyName) {
                check = false;
              }

            }
            if (!check) {
              this.isSolved.push(false);
            } else {
              this.isSolved.push(true);
            }
            console.log(this.isSolved);
            this.surveys.push(survey);
            this.surveyCreators.push(this.user);
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

  solvedSurveys() {
    this.db.firestore().collection('results').doc(this.authService.curUser).get().then(results => {
      var resultSet = [];
      resultSet = results.data()['surveyResults'];
      for (let index = 0; index < resultSet.length; index++) {
        this.resultSet.push(resultSet[index].surveyName);
      }

    })
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
