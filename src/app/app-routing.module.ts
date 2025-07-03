import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UpdatepasswordComponent } from './components/updatepassword/updatepassword.component';
import { ConfirmotpComponent } from './components/confirmotp/confirmotp.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  //{ path:'', component:HomeComponent},
  { path:'login', component:LoginComponent},
  { path:'login/register', component:RegisterComponent},
  { path:'login/forgetpassword', component:ForgetpasswordComponent},
  { path:'login/resetpassword', component:ResetpasswordComponent},
  { path:'login/updatepassword', component:UpdatepasswordComponent},
  { path:'login/register/confirmotp', component:ConfirmotpComponent},
  { path:'mainpage', component:MainpageComponent },
  { path:'dashboard', component:DashboardComponent },
  { path:'categories', component:CategoriesComponent },
  { path:'products', component:ProductsComponent },
  { path:'orders', component:OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
