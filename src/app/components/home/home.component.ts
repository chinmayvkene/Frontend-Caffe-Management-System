import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _router: Router, private _toastr: ToastrService) { }

  loginUser: string = '';
  
  ngOnInit(): void {
    //this.updateLoginStatus()
  }

  ngDoCheck() {
    this.updateLoginStatus()
  }

  updateLoginStatus() {
    if (typeof window !== 'undefined' && localStorage) {
      this.loginUser = localStorage.getItem('username') as string || '';
    }
  }

  Logout() {
    localStorage.clear();
    //this.loginUser = '';
    this._toastr.success('Logout Successfully', 'Success', { closeButton: true });
    this._router.navigate(['/']);
  }
}
