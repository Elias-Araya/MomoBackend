import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Core/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  logFailed(msg: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  logSucess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'LogIn exitoso',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    document.body.classList.add('body-Home');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((c) => {
        c.markAllAsTouched();
      });
      return;
    }

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (success) => {
          console.log('Login exitoso', success);
          this.logSucess();
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log('Error en la wea', e);
          console.log('ERROR MENSAJE ', e.error.mensaje);
          this.logFailed(e.error.mensaje);
        },
      });
    }
  }

  public get f(): any {
    return this.loginForm.controls;
  }
}
