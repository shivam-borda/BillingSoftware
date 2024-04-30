import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

import { Signin2Component } from './signin/signin-2/signin-2.component';
import { Register2Component } from './register/register-2/register-2.component';



const routes: Routes = [
  {
    path: '',
    component: Signin2Component,
  }
 ,
 {
  path: 'register-2',
  component: Register2Component,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
