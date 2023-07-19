import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MesaService } from 'src/app/service/mesa.service';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-agregar-reserva',
  templateUrl: './agregar-reserva.component.html',
  styleUrls: ['./agregar-reserva.component.scss'],
})
export class AgregarReservaComponent implements OnInit {
  @Input() userId: any;
  opcionesSelect: any[] = [];
  myForm: FormGroup;
  opcionSeleccionada: any;
  @Input() reserva: any;
  titulo: any = 'Agregar';
  @Input() editarModo: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private mesaSvc: MesaService,
    private toastrService: ToastrService,
    private reservaSvc: ReservaService
  ) {
    this.myForm = this.fb.group({
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      mesaId: ['', [Validators.required]],
      mensaje: [''],
    });
  }

  ngOnInit(): void {
    this.mesaSvc.getMesas().subscribe((res: any) => {
      console.log('RES ', res);
      res.data.forEach((res: any) => {
        res.id_mesa = `${res.id_mesa}-${res.capacidad}`;
        this.opcionesSelect.push(res);
        console.log('OPC ', this.opcionesSelect);
      });
    });
    if (this.reserva) {
      this.titulo = 'Editar';
      this.mapData(this.reserva);
      console.log('THIs del if ', this.reserva);
    } else {
      console.log('this re del else ', this.reserva);
    }
  }

  mapData(reserva: any) {
    this.myForm = this.fb.group({
      fecha: reserva.fecha,
      hora: reserva.hora,
      mesaId: `${reserva.id_mesa}-${reserva.cantidad}`,
      mensaje: reserva.mensaje,
      estado: reserva.estado,
    });

    console.log('THIS MY FORM ', this.myForm.value);
  }
  guardarReserva() {
    this.toastrService.success('No se realizaron cambios', 'Vamos super bien ');
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      const mesaId = this.myForm.get('mesaId')?.value;
      const fecha = this.myForm.get('fecha')?.value;
      const hora = this.myForm.get('hora')?.value;
      const mensaje = this.myForm.get('mensaje')?.value;
      const valores = mesaId.split('-');
      const id_mesa = valores[0];
      const cantidad = valores[1];

      let objReserva = {
        id_usuario: this.userId,
        id_mesa,
        cantidad,
        fecha,
        hora,
        mensaje,
      };
      console.log('RES ', objReserva);
      this.reservaSvc.postReserva(objReserva).subscribe({
        next: (resp: any) => {
          console.log(resp);
          alert(resp.data.mensaje);
          this.activeModal.close({ estado: true, resp });
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
      console.log(objReserva);
    } else {
      this.toastrService.error('Faltan campos por rellenar', 'Ups! ');
      alert('Faltan campos por rellenar');
    }
  }

  editarReserva() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      const mesaId = this.myForm.get('mesaId')?.value;
      const fecha = this.myForm.get('fecha')?.value;
      const hora = this.myForm.get('hora')?.value;
      const mensaje = this.myForm.get('mensaje')?.value;
      const valores = mesaId.split('-');
      const id_mesa = valores[0];
      const cantidad = valores[1];

      let objReserva = {
        id_usuario: this.userId,
        id_mesa,
        cantidad,
        fecha_hora: fecha + ' ' + hora,
        mensaje,
      };

      this.reservaSvc
        .patchReserva(objReserva, this.reserva.id_reserva)
        .subscribe({
          /* console.log('RES');
          console.log('RES ', res);
          if (!res.data.estado) {
            alert(res.data.mensaje);
            return;
          }
          this.activeModal.close({ estado: true, res }); */
          next: (resp: any) => {
            console.log(resp);
            if (!resp.data.estado) {
              alert(resp.data.mensaje);
              return;
            }
            alert(resp.data.mensaje);
            this.activeModal.close({ estado: true, resp });
          },
          error: (err: any) => {
            console.log(err);
            alert(err.error.mensaje);
          },
        });
      console.log(objReserva);
    } else {
      this.toastrService.error('Faltan campos por rellenar', 'Ups! ');
      alert('Faltan campos por rellenar');
    }
  }
}
