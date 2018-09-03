import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token : any;
  email : String;
  password: String;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  // onSubmit(){
  //   const user={
  //     email = this.email,
  //     password = this.password
  //   };

  //}





}
