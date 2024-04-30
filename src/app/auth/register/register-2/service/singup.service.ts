import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingupService {
  

  constructor(private http:HttpClient) { }

  

  singup(user:any){
    const jsonData = JSON.stringify(user);
    console.log(jsonData);
    
   return this.http.post('http://208.64.33.118:4152/api/Auth/signup',jsonData)
  }

  obj = {"mobileNo":"1","password":"1","companyName":"1","address":"1","gstin":"1","email":"1"}

  singup2(user:any){
    return this.http.post('http://208.64.33.118:4152/api/Auth/signup',{
      mobileNo : user.mobileNo,
      password : user.password,
      companyName : user.companyName,
      address : user.address,
      gstin : user.gstin,
      email : user.email
    })
  }
}
