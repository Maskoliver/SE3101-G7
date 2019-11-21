import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    submitClick:boolean=true;
  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }
  contact(name:string,email:string,subject:string,message:string){
    this.fbService.contact(name,email,subject,message);
    this.submitClick=false;
  }
}
