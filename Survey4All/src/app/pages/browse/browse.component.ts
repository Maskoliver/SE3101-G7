import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }
  goResults() {
    this.router.navigate(['result']);
  }
}
