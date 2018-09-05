import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any;
  email: String;
  password: String;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

   showPassword() {
    var x = (<HTMLInputElement>document.getElementById("password"));
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

   onSubmit() {
     const user = {
       email : this.email,
       password : this.password
      };

    this.authService.loginUser(user).subscribe( data => {
      if (data == 'Failed') {
        alert('User not found, please try again');
        this.router.navigate(['/home']);
      }
      else {
        const user = data['user'];
        this.authService.storeUser(user)
        this.router.navigate(['/dash'])// TO DO success
      }



    }, err =>{
      alert('Oh no! Something went wrong. Please try again!');
      this.router.navigate(['/home']);
    });
}




}
