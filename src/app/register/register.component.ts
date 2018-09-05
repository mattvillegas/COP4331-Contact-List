import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fname: String;
  lname: String;
  email: String;
  password: String;

  constructor(private router: Router,  public authService: AuthService,public validateService: ValidateService) { }

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

  onRegisterSubmit() {
    const user = {
      fname : this.fname,
      lname: this.lname,
      email : this.email,
      password : this.password
    };

    if(!this.validateService.validateRegister(user)){
      alert('Please fill in all fields');
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      alert('Please use a valid email');
      return false;
    }

    this.authService.registerUser(user).subscribe(
      data => {
        // this.showSuccess('You are registered and now can log in.');
        alert('You are registered and now can log in');
        this.router.navigate(['/home']);
    }, error => {
        alert('Something went wrong, please try again');
       // this.showError();
        this.router.navigate(['/register']);
    });

  }
}
