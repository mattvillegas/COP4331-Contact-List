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
  contactlist: any;

  _id: string = null;
  name: string;
  phone: string;
  email: string;
  address: string;
  CreatedByUserID: string;

  inputString: string;

  constructor(private router: Router, public authService:AuthService) { }

  ngOnInit() {
      if (sessionStorage.length == 0){
      this.router.navigate(['/home']);
    }
      var temp = sessionStorage.getItem('user');
      this.user = JSON.parse(temp);
      this.user_id = this.user['id'];
      this.getContactList();
    }

  clearFields(){
    this._id = undefined;
    this.name = undefined;
    this.phone = undefined;
    this.email = undefined;
    this.address = undefined;
    this.CreatedByUserID = undefined;
  }

  onAddButton(){
      const new_contact = {
        _id: this._id,
        name: this.name,
        phone: this.phone,
        email: this.email,
        address: this.address,
        CreatedByUserID: this.user["id"]
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
    this.authService.addContact(NewContact).subscribe(data=>{
      this.clearFields();
    }, err=>{
      alert('Failed to add a contact!'+err);
    });
    this.getContactList();

  }

  EditContact(OldContact){
    this.authService.updateContact(OldContact).subscribe(data=>{
      this.clearFields();
	  this.getContactList();
    }, err=>{
      alert('Failed to update a contact!'+err);
    });
  }

  onEditButton(currentContact){
    this._id = currentContact._id;
    this.name = currentContact.name;
    this.phone = currentContact.phone;
    this.email = currentContact.email;
    this.address = currentContact.address;
    this.CreatedByUserID = currentContact.CreatedByUserID;
  }

  getContactList(){
    this.authService.getContacts().subscribe(data =>{
    this.contactlist = data;
    })
  }

  onDeleteButton(contact){
    this.authService.deleteContact(contact).subscribe(data=>{
    this.contactlist.splice(this.contactlist.indexOf(contact),1);
      // alert('Deleted a contact');
    }, err =>{
      alert('Failed to delete a contact!'+err);
    });
  }

  search_contact(){
    if(this.inputString == undefined){
      // alert('Empty search!');
      return false;
    }
  }

  onMapsButton(address){
	  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
			var crd = pos.coords;
			address = address.replace(" ", "+");
			var baseURL = 'https://www.google.com/maps/dir/?api=1&origin=';
			var userLoc = crd.latitude + ',' + crd.longitude;
			var destURL = '&destination=' + address + '&travelmode=driving';
			var finalUrl = baseURL + userLoc + destURL;
			//var finalUrl = encodeURIComponent(baseURL + userLoc + destURL);
			window.open(finalUrl, "_blank");



			}, this.error);

      } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
		alert("Geolocation not supported by this browser.");
      }

	  //window.open('https://www.google.com','_blank');
	  //String baseURL = 'https://www.google.com/maps/dir/?api=1&origin=';
	  //String userLoc = '';
	  //String destURL = '&destination=' + address + '&travelmode=driving';

	  // do stuff
	  //String finalURL = baseURL + userLoc + destURL;
	  //alert(address);
  }


  error(err) {
	 alert("ERROR");
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
}
