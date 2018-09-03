import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

//  private baseUri:string="http://localhost:8080/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  registerUser(user){
    return this.http.post('/api/users/createuser', user, {headers:this.headers});
  }
}
