import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserCredentials } from '../../classes/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _userService: UserService, private _builder: FormBuilder, private _router: Router, private _toastr: ToastrService) { }

  response: any;
  loginForm = this._builder.group({
    username: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.required)
  })

  ngOnInit() {
    if(typeof window !== 'undefined' && localStorage){
      localStorage.clear();
    }  
  }

  SaveData() {
    if (this.loginForm.valid) {
      let userCredentials: UserCredentials = {
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }

      this._userService.Login(userCredentials).subscribe(item => {
        this.response = item

        if (this.response.status === 1) {
          localStorage.setItem('token', this.response.data.token);
          localStorage.setItem('username', userCredentials.username);
          localStorage.setItem('role', this.response.data.userRole);
          this._toastr.success('Login Successfully', 'Success', { closeButton: true })
          this._router.navigate(['/mainpage'])
        }
      }, error => {
      this._toastr.error("Failed to login Invalid username and passowrd", error.error.title, { closeButton: true });
     })
    }
  }

  // ForgotPassword() {

  // }
}
