import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.length == 0){
      this.router.navigate(['/home']);
    }
  }

}
