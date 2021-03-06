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
  isSolved = [];
  resultSet = [];
  surveyName: any;
  constructor(private router: Router, private db: FirebaseApp, private sharedService: SharedService, private authService: AuthService) {

  }

  ngOnInit() {
    //  console.log(this.today);
    this.surveyCreationDate = [];
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
            if (survey.timeCreated) {
              this.surveyCreationDate.push(survey.timeCreated);
            }
            else {
              this.surveyCreationDate.push("");
            }
            // for(let i=0;i<this.surveyCreationDate.length;i++){
            // console.log( this.surveyCreationDate[i]);
            //   this.startDate= this.surveyCreationDate[i];
            // this.endDate= new Date(this.startDate + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 90);
            //console.log(this.endDate);
            //   }
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

  solvedSurveys() {
    this.db.firestore().collection('results').doc(this.authService.curUser).get().then(results => {
      var resultSet = [];
      resultSet = results.data()['surveyResults'];
      for (let index = 0; index < resultSet.length; index++) {
        this.resultSet.push(resultSet[index].surveyName);
      }

    })
  }

//   addFavoriteSurvey(surveyName: string) {
//     var newResult =[];
//     console.log(surveyName);
//     var favoritesList = {"surveyName": surveyName};
//     console.log(favoritesList);
//         this.db.firestore().collection("users").doc(this.authService.curUser).get().then(favoritesList => {
//       if (favoritesList.exists) {
//         newResult = favoritesList.data()['favoritesList'];
//         newResult.push(favoritesList);
//         console.log(newResult);
//         this.db.firestore().collection("users").doc(this.authService.curUser).update({
//           favoritesList: newResult,
//         })
//         console.log("ey");
//         this.isFavorite=true;
//       }
//       else {
//         var myResult = [];
//         myResult.push(favoritesList);
//         console.log(myResult);
//         this.db.firestore().collection("users").doc(this.authService.curUser).set({
//           favoritesList: myResult
//         })
//       console.log("ay");
      
//       this.isFavorite=true;
//       }

//     })
// }
}