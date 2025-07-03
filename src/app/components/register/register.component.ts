import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmRegister, UserRegister } from '../../classes/user.model';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private _userService: UserService, private _builder: FormBuilder, private _router: Router, private _toastr:ToastrService) { }

  response: any;

  registerForm = this._builder.group({
    id: this._builder.control(0),
    username: this._builder.control(null, Validators.required),
    name: this._builder.control(null, Validators.required),
    email: this._builder.control(null, Validators.required),
    phone: this._builder.control(null, Validators.required),
    password: this._builder.control(null, [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)]),
    role: this._builder.control('--Select Role--', Validators.required)
  })

  ngOnInit() {

  }

  SaveData() {
    
    if (this.registerForm.valid) {
      let formValues = this.registerForm.value;

      let register: UserRegister = {
        //id: formValues.id!,
        username: formValues.username!,
        name: formValues.name!,
        email: formValues.email!,
        phone: formValues.phone!,
        password: formValues.password!,
        role: formValues.role!
      };

      this._userService.RegisterUser(register).subscribe(item => {
        debugger
        this.response = item
        console.log(this.response)
        if (this.response.status === 1) {
          let confirmRegister: ConfirmRegister = {
            //userid: this.response.data.id,
            username: register.username,
            otptext: ''
          }
          //console.log(confirmRegister);

          this._userService.confirmRegisterSignal.set(confirmRegister);
          this._toastr.success("Validate OTP and Complete the registration", "Success", {closeButton: true});
          this._router.navigate(['/login/register/confirmotp'])
        }

        
      }, error => {
        this._toastr.error("Failed to register due to duplicate username or email or role", error.error.title, {closeButton: true})
      })
    }
  }

  Cancel() {
    this._router.navigate(['/login']);
  }
}
