import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

 // private baseUri:string="http://localhost:8080/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Store user info in local storage
  storeUser(user){
    sessionStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }


  // Endpoints for logging in and registering user
  registerUser(user){
    return this.http.post('/api/users/createuser', user, {headers:this.headers});
  }

  loginUser(user){
    return this.http.post('/api/users/login', user, {headers:this.headers});
  }

  // Endpoints for interacting with Contacts
  getContacts(){
	  //alert(this.user.id)
    return this.http.get('/api/contacts/'+this.user.id, {headers:this.headers});
}

  addContact(contact: Contact){
    return this.http.post('/api/contacts/create/'+this.user.id, contact, {headers:this.headers});
  }

  updateContact(contact: Contact){
    console.log(contact);
    return this.http.post('/api/contacts/update/'+contact._id, contact, {headers:this.headers});
  }

  deleteContact(contact: Contact){
	  console.log("logging from frontend")
    return this.http.post('/api/contacts/delete/'+contact._id, {headers:this.headers});
  }
}
