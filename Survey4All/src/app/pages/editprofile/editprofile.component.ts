import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  submitClick:boolean=true;
  photoClick:boolean=true;
  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }
  
  edit(){
console.log("TAMAMDIRSSS")
this.submitClick=false;
}
umut(){
  console.log("çalışıyor babba")
  this.photoClick=false;
}
}
