import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`)
  }

  // generate- token
  public generateToken(logInData : any) {
     
    return this.http.post(`${baseUrl}/generate-token`,logInData);
  }

  //login user: set token in localStorage
  public logInUser(token:any) {
    localStorage.setItem("token",token);
    return true;
  }

  //isLogIn: user logged in or not
  public isLoggedIn() {
    let  tokenStr = localStorage.getItem("token");
    // console.log("islog");
    
    if(tokenStr==undefined || tokenStr == '' || tokenStr==null) {
     return false;
    } else {
      return true;
    }
  }

  // Logout : remove token form local storage
    public logout() {
      localStorage.removeItem("token");
      localStorage.removeItem('user');
      return true;

    }

  //get token
  public getToken() {
    return localStorage.getItem("token");
  }  

  // set userDetails
  public setUser(user:any) {
    localStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser() {
     let userStr = localStorage.getItem("user");

     if(userStr!=null) {
       return JSON.parse(userStr);
     } else {
       this.logout();
       return null;
     }
  }

  // get user role

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority; 
  }
}
