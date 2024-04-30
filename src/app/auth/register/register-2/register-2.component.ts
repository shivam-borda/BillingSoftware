import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../core/helpers/routes';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SingupService } from './service/singup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-2',
  templateUrl: './register-2.component.html',
  styleUrl: './register-2.component.scss'
})
export class Register2Component implements OnInit{
  singupform : FormGroup = new FormGroup({})
  public routes = routes;
  public password : boolean[] = [false];
  error : any
  mobileNoBorderColor: string = '';

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }
  constructor(private router: Router , private singupservice : SingupService) {
  }

  ngOnInit(): void {
    this.singupform = new FormGroup({
      mobileNo : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),
      companyName : new FormControl('',Validators.required),
      address : new FormControl('',Validators.required),
      gstin : new FormControl('',Validators.required),
      email : new FormControl('',Validators.required),
      conforimpassword : new FormControl(''),
      rememberMe: new FormControl(false)
    },{
      validators : this.passwordMatchValidators
    })
  }

  passwordMatchValidators(control:AbstractControl){
    return control.get('password')?.value === 
    control.get('conforimpassword')?.value
    ? null
    : { mismatch : true}
  }

  submit(){
    this.singupservice.singup2(this.singupform.value).subscribe(
      (data:any) => {
        console.log(data);
       this.confirmColor()
      },
      (error) => {
       console.log(error.error.message);
       this.error = error.error.message
       this.confirmColor2()
       
      }
    )
    
  }

  confirmColor() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    });

    Promise.resolve({ isConfirmed: true }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Sing up!',
          'Thank you for signing up!',
          'success'
        );
      }
      this.router.navigate([routes.signIn2])
    });
  }

  confirmColor2() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    });
  
    Promise.resolve({ dismiss: Swal.DismissReason.cancel }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          this.error,
          'error'
        );
        this.singupform.get('mobileNo')?.reset('');
        this.mobileNoBorderColor = 'red';
      }
    });
  
   
  }
  
}
