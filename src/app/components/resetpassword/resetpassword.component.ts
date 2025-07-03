import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResetPassword } from '../../classes/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  constructor(private _builder: FormBuilder, private _userService: UserService, private _router: Router, private _toastr: ToastrService) { }

  resetPasswordForm = this._builder.group({
    oldpassword: this._builder.control('', Validators.required),
    newpassword: this._builder.control('', Validators.required),
  })

  response: any;
  currentUsername: string = ''
  ngOnInit(): void {
    if(typeof window !== 'undefined' && localStorage){
      this.currentUsername = localStorage.getItem('username') as string;
    }
  }

  ProceedResetPassowrd() {
    if (this.resetPasswordForm.valid) {
      let resetPassword: ResetPassword = {
        username: this.currentUsername,
        oldpassword: this.resetPasswordForm.value.oldpassword as string,
        newpassword: this.resetPasswordForm.value.newpassword as string
      }

      this._userService.ResetPassword(resetPassword).subscribe(item => {
        this.response = item;

        if (this.response.status === 1) {
          this._toastr.success('Passowrd has been changed. Please login with new password', 'Success', { closeButton: true });
          this._router.navigate(['/login']);
        }
      }, error => {
        this._toastr.error("Failed to reset password due to the same password that is used in last 3 transactions", error.error.title, { closeButton: true })
      })
    }
  }
}
