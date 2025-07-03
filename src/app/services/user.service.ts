import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmRegister, LoginResponse, ResetPassword, UpdatePassword, UserCredentials, UserRegister } from '../classes/user.model';
import { APIResponse } from '../classes/APIResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient:HttpClient) { }

  confirmRegisterSignal = signal<ConfirmRegister>({
    //userid: 0,
    username: "",
    otptext: ""
  })

  usernameSignal = signal('');
  
  header = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  basicUrl: string = 'http://localhost:5210/api/User'

  public RegisterUser(userRegister:UserRegister): Observable<APIResponse<UserRegister>>{
    return this._httpClient.post<APIResponse<UserRegister>>(`${this.basicUrl}/UserRegistration`, userRegister, { headers: this.header });
  }

  public ConfirmRegister(confirmRegister:ConfirmRegister): Observable<APIResponse<ConfirmRegister>>{
    return this._httpClient.post<APIResponse<ConfirmRegister>>(`${this.basicUrl}/ConfirmRegistration`, confirmRegister, { headers: this.header });
  }

  public ResetPassword(resetPassword:ResetPassword): Observable<APIResponse<ResetPassword>>{
    return this._httpClient.post<APIResponse<ResetPassword>>(`${this.basicUrl}/ResetPassword`, resetPassword, { headers: this.header });
  }

  public ForgetPassword(username:string): Observable<APIResponse<string>>{
    return this._httpClient.get<APIResponse<string>>(`${this.basicUrl}/ForgetPassword?username=${encodeURIComponent(username)}`, { headers: this.header });
  }

  public UpdatePassword(updatePassword:UpdatePassword): Observable<APIResponse<UpdatePassword>>{
    return this._httpClient.post<APIResponse<UpdatePassword>>(`${this.basicUrl}/UpdatePassword`, updatePassword, { headers: this.header });
  }

  public Login(userCredentials:UserCredentials): Observable<APIResponse<LoginResponse>>{
    return this._httpClient.post<APIResponse<LoginResponse>>('http://localhost:5210/api/Authorize/GenerateToken', userCredentials, { headers: this.header })
  }
}
