import { Component, OnInit } from '@angular/core';
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
    private modalService: NgbModal
  ) {
    this.authSvc.getCurrentUser().subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit(): void {
    this.reservaSvc
      .getReservas(this.userDetails?.id_usuario)
      .subscribe((reservas) => {
        this.reservas.push(reservas.data);
        console.log(reservas);
      });
  }

  agregarReserva() {
    this.modalRef = this.modalService.open(AgregarReservaComponent, {
      size: 'lg',
    });
    /* this.modalRef.componentInstance.participantes = this.participantesFilter;
    this.modalRef.componentInstance.listarTipoRecopiladorAll = this.listarTipoRecopiladorAll;
    this.modalRef.componentInstance.rutaActualId = this.procId; */
    this.modalRef.result.then((result) => {
      console.log(result);
      if (result.estado) {
        /* this.participantesFilter.push(result.participante);
        this.participantes.push(result.participante); */
      }
    });
  }
}
