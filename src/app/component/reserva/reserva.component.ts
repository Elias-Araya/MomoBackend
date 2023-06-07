import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Core/auth-service';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  reservaForm!: FormGroup;
  userLogin: boolean = true;
  userLoggedIn = this.authSvc.isLogged();

  constructor(
    private readonly fb: FormBuilder,
    private reservaSvc: ReservaService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.reservaForm = this.initForm();
    this.reservaForm.get('fecha')?.patchValue(this.formatDate(new Date()));
  }

  onSubmit(): void {
    let body = this.reservaForm.value;
    body.id_mesa = 2;

    if (this.userLoggedIn) {
      let fecha = body.fecha.split('-');
      body.fecha = [fecha[2], fecha[1], fecha[0]].join('-');
      body.id_usuario = parseInt(
        JSON.parse(localStorage.getItem('user') || '{}').id_usuario || '0'
      );
      delete body.nombre;
      delete body.email;
      delete body.telefono;
      this.reservaSvc.postReserva(body).subscribe((res) => {
        console.log('Reserva hecha ', res);
        this.reservaForm.reset();
        this.reservaForm.get('fecha')?.patchValue(this.formatDate(new Date()));
      });

      return;
    }
    let fecha = body.fecha.split('-');
    body.fecha = [fecha[2], fecha[1], fecha[0]].join('-');
    this.reservaSvc.postReservaG(body).subscribe((res) => {
      console.log('Reserva hecha ', res);
      this.reservaForm.reset();
      this.reservaForm.get('fecha')?.patchValue(this.formatDate(new Date()));
    });
    console.log('BODY ', body);
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      telefono: [],
      fecha: ['', [Validators.required]],
      cantidad: [, [Validators.required, Validators.minLength(1)]],
      hora: ['', [Validators.required]],
      mensaje: [''],
    });
  }
}
