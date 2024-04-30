import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Signin2Component } from './signin/signin-2/signin-2.component';
import { AuthComponent } from './auth.component';
import { sharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { Register2Component } from './register/register-2/register-2.component';
import { HttpClientModule } from '@angular/common/http';
import { SingupService } from './register/register-2/service/singup.service';




@NgModule({
  declarations: [
    AuthComponent,
    Signin2Component,
    Register2Component
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    sharedModule,
    HttpClientModule
  ],
  providers:[SingupService]
})
export class AuthModule { }
