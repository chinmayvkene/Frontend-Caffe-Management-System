import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UpdatePassword } from '../../classes/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css'
})
export class UpdatepasswordComponent {

  constructor(private _builder:FormBuilder, private _userService:UserService, private _toastr:ToastrService, private _router:Router){}

  currentUsername:string = '';
  response:any;

  updatePasswordForm = this._builder.group({
    password: this._builder.control('', Validators.required),
    otptext: this._builder.control('', Validators.required),
  })

  ngOnInit(){
    this.currentUsername = this._userService.usernameSignal();
    //console.log(this.currentUsername);
  }

  ProceedUpdatePassowrd(){
    
    if(this.updatePasswordForm.valid){
      let updatePassword:UpdatePassword = {
        username: this.currentUsername,
        password: this.updatePasswordForm.value.password as string,
        otptext: this.updatePasswordForm.value.otptext as string
      }

      console.log(updatePassword)

      this._userService.UpdatePassword(updatePassword).subscribe(item => {
        this.response = item

        if(this.response.status === 1){
          this._toastr.success("Password has benn changed. Login with new password.", "Success", {closeButton:true})
          this._router.navigate(['/login'])
        }
      }, error => {
        this._toastr.error("Inavalid password or otp", error.error.title, {closeButton:true})
      })
    }
  }
}
