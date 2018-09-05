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
  addContact(user, contact: Contact){
    return this.http.post('/api/contacts/create/:'+this.user._id, contact, {headers:this.headers});
  }

  updateContact(contact: Contact){
    return this.http.put('/api/contacts/update/:'+this.user._id, contact, {headers:this.headers});
  }

  deleteContact(contact: Contact){
    const id = contact._id;
    return this.http.delete('/api/contacts/delete'+id, {headers:this.headers});
  }
}
