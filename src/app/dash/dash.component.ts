import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Contact } from '../services/contact';
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  user : Object;
  user_id: String;

  contact:Contact;
  contactlist:Contact[];

  _id: string = null;
  name: string;
  phone: string;
  email: string;
  address: string;
  CreatedByUserID: string;

  constructor(private router: Router, public authService:AuthService) { }

  ngOnInit() {
    //if (sessionStorage.length == 0){
      //this.router.navigate(['/home']);
      var temp = sessionStorage.getItem('user');
      this.user = JSON.parse(temp);
      this.user_id = this.user['id'];
    }

  onAddButton(){
      const new_contact = {
        _id: this._id,
        name: this.name,
        phone: this.phone,
        email: this.email,
        address: this.address,
        CreatedByUserID: this.user_id
      }
      if(new_contact._id == null){
        this.AddContact(new_contact);
      }else{
        if(new_contact._id != null){
          this.EditContact(new_contact);
        }
      }
  }

  AddContact(NewContact){

  }

  EditContact(OldContact){

  }

}
