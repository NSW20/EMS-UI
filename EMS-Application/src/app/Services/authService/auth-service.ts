import { Service,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponseWrapper } from '../../Models/designation_model';

@Service()
export class AuthService {
     private readonly apiBaseUrl:string='http://localhost:5103/api/V1/Auth/';
     private httpClient:HttpClient=inject(HttpClient);
    
    registerUser(register:Register):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'RegisterUser',register)
    }
     loginUser(login:Login):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'LoginUser',login)
    }
     forgotPassword(forgotPassword:ForgotPassword):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'ForgotPassword',forgotPassword)
    }
      resetPassword(resetPassword:ResetPassword):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'ResetPassword',resetPassword)
    }
}
