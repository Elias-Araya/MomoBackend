import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Core/auth-service';
import { AgregarReservaComponent } from 'src/app/modals/agregar-reserva/agregar-reserva.component';
import { User } from 'src/app/model/user';
import { ReservaService } from 'src/app/service/reserva.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.scss'],
})
export class ListarReservasComponent implements OnInit {
  userDetails: User | null = null;
  reservas: any[] = [];
  modalRef: NgbModalRef | undefined;
  constructor(
    private authSvc: AuthService,
    private reservaSvc: ReservaService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.authSvc.getCurrentUser().subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit(): void {
    this.listReservasByClient();
  }

  listReservasByClient() {
    this.reservas = [];
    this.reservaSvc
      .getReservas(this.userDetails?.id_usuario)
      .subscribe((reservas) => {
        /* this.reservas.push(reservas.data); */
        reservas.data.forEach((res) => {
          this.reservas.push(res);
        });
        /* console.log('This Reservas ', this.reservas);
        console.log('Reservas ', reservas.data); */
      });
  }

  eliminarReserva(id: any) {
    console.log('Eliminar ', id);
    if (id.estado === 'pendiente') {
      if (confirm() == true) {
        this.reservaSvc.delReserva(id.id_reserva).subscribe((res) => {
          alert(res.mensaje);
          this.listReservasByClient();
        });
      }
    }
  }
  editarReserva(reserva: any, index: any) {
    console.log('Editar ', reserva);
    this.modalRef = this.modalService.open(AgregarReservaComponent, {
      size: 'lg',
    });
    this.modalRef.componentInstance.reserva = reserva;
    this.modalRef.componentInstance.editarModo = true;
    this.modalRef.componentInstance.userId = this.userDetails?.id_usuario;
    this.modalRef.result.then((result) => {
      console.log(result);
      if (result.estado) {
        this.listReservasByClient();
      }
    });
  }
  logOut(): void {
    this.router.navigate(['/']);
    this.authSvc.logOut();
  }
  agregarReserva() {
    this.modalRef = this.modalService.open(AgregarReservaComponent, {
      size: 'lg',
    });
    /* this.modalRef.componentInstance.participantes = this.participantesFilter;
    this.modalRef.componentInstance.listarTipoRecopiladorAll = this.listarTipoRecopiladorAll;
     */
    this.modalRef.componentInstance.userId = this.userDetails?.id_usuario;
    this.modalRef.result.then((result) => {
      console.log(result);
      if (result.estado) {
        this.listReservasByClient();
      }
    });
  }
}
