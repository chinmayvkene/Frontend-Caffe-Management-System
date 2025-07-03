import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ConfirmRegister } from '../../classes/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmotp',
  templateUrl: './confirmotp.component.html',
  styleUrl: './confirmotp.component.css'
})
export class ConfirmotpComponent {

  constructor(private _builder:FormBuilder, private _userService:UserService, private _router:Router, private _toastr:ToastrService){}

  otptext:string = '';
  confirmRegistration!: ConfirmRegister;
  response:any;

  ngOnInit(){
    
  }

  ConfirmOtp(){
    this.confirmRegistration = this._userService.confirmRegisterSignal();
    this.confirmRegistration.otptext = this.otptext;
    //console.log(this.confirmRegistration)
    this._userService.ConfirmRegister(this.confirmRegistration).subscribe(item => {
      this.response = item

      if(this.response.status === 1){
        this._toastr.success("Registration is successfully completed. Please login", "Success", {closeButton:true})
        this._userService.confirmRegisterSignal.set({
         //userid: 0,
          username: "",
          otptext: ""
        })
        this._router.navigate(['/login']);
      }
    }, error => {
      this._toastr.error("Invalid OTP", error.error.title, {closeButton:true})
    })
  }
}
