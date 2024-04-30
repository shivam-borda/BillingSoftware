import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../../core/helpers/routes';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { SinginService } from './singin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin-2',
  templateUrl: './signin-2.component.html',
  styleUrl: './signin-2.component.scss'
})
export class Signin2Component implements OnInit {
  singinform: FormGroup = new FormGroup({})
  public routes = routes;
  error: any
  loading = false
  constructor(private router: Router, private singinservce: SinginService) { }

  ngOnInit(): void {
    this.singinform = new FormGroup({
      mobileNo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }



  submit() {
    this.loading = true
    this.singinservce.singin(this.singinform.value).subscribe(
      (response:any) => {
       localStorage.setItem('token', response.body.token);
        this.confirmColor()
        this.singinform.reset()
        this.loading = false
        this.router.navigate([routes.productList])
      },
      (error) => {
        this.loading = false
        this.error = error.error.message
        this.confirmColor2()

      }
    )

  }

  public password: boolean[] = [false];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index]
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
          'Sing in!',
          'Thank you for signing in!',
          'success'
        );
      }

    });
  }

  confirmColor2() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: ' btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })


    Promise.resolve({ dismiss: Swal.DismissReason.cancel }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          this.error,
          'error'
        )
      }
    });
    this.singinform.reset()
  }


}
