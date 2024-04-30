import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SinginService {

  constructor(private http : HttpClient) {}

  singin(user:any){
   return this.http.post('http://208.64.33.118:4152/api/Auth/Login',{
      mobileNo : user.mobileNo,
      password : user.password
    }, { observe: 'response' });
  }
}
