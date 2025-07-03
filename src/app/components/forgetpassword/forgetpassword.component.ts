import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

  constructor(private _userService: UserService, private _router: Router, private _toastr:ToastrService) { }

  username:string = '';
  response:any;

  ProceedForgotPassowrd(){
    this._userService.ForgetPassword(this.username).subscribe(data => {
      this.response = data
      if (this.response.status === 1) {
        this._toastr.success("OTP has been sent to the registered email", "Forget Password", {closeButton:true});
        this._userService.usernameSignal.set(this.username);
        this._router.navigate(['login/updatepassword']);
      }
    }, error => {
      this._toastr.error("Invalid username.", error.error.title, {closeButton:true})
    })
  }
}
