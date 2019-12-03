import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {


  constructor(private router: Router, private fbService: FirebaseService) { }

  ngOnInit() {
  }
  goResults() {
    this.router.navigate(['result']);
  }
}
