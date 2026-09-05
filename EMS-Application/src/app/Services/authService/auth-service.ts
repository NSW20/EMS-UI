import { Service,Signal,inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIResponseWrapper } from '../../Models/designation_model';
import {jwtDecode} from 'jwt-decode'

@Service()
export class AuthService {
     private readonly apiBaseUrl:string='http://localhost:5103/api/V1/Auth/';
     private httpClient:HttpClient=inject(HttpClient);
     tokenSignal=signal<string|null>(localStorage.getItem('authToken'));
    registerUser(register:Register):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'RegisterUser',register)
    }
     loginUser(login:Login):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'LoginUser',login)
    }
     forgotPassword(forgotPassword:ForgotPasswordModel):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'ForgotPassword',forgotPassword)
    }
      resetPassword(resetPassword:ResetPasswordModel):Observable<APIResponseWrapper<string>>{
        return this.httpClient.post<APIResponseWrapper<string>>(this.apiBaseUrl+'ResetPassword',resetPassword)
    }
    getUserRole():string|null{
        const token=this.tokenSignal();
        if(!token){
            return null;
        }
        const decoded:any=jwtDecode(token);
        console.log(decoded)
       return decoded.role 
      || decoded.Role 
      || decoded.roles?.[0] 
      || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] 
      || null;
    }
    getLoggedInUser():string|null{
        const token = this.tokenSignal();
        if (!token) return null;
        const decoded: any = jwtDecode(token);
        return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
            || decoded.name
            || null;
    }
   setToken(token: string | null): void {
    if (token) localStorage.setItem('authToken', token);
    else localStorage.removeItem('authToken');
    this.tokenSignal.set(token);  // update signal
  }
}
