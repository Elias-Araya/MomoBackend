import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Core/auth-service';
import { User } from 'src/app/model/user';
import { PedidoService } from 'src/app/service/pedido.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss'],
})
export class ListarPedidosComponent implements OnInit {
  userDetails: User | null = null;

  pedidos: any[] = [];
  modalRef: NgbModalRef | undefined;
  constructor(
    private authSvc: AuthService,
    private pedidoSvc: PedidoService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.authSvc.getCurrentUser().subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit(): void {
    this.listPedidosByClient();
  }

  listPedidosByClient() {
    this.pedidos = [];
    this.pedidoSvc
      .getProducts(this.userDetails?.id_usuario)
      .subscribe((pedidos) => {
        /* this.reservas.push(reservas.data); */
        pedidos.data.forEach((res) => {
          this.pedidos.push(res);
        });
        /* console.log('This Reservas ', this.reservas);
        console.log('Reservas ', reservas.data); */
        console.log('Reservas ', pedidos.data);
      });
  }
  logOut(): void {
    this.router.navigate(['/']);
    this.authSvc.logOut();
  }
  generarFactura(id: any) {
    console.log('ID ', id);
    this.pedidoSvc.obtenerFactura(id).subscribe(
      (blob: Blob) => {
        const filename = 'factura.pdf'; // Nombre de archivo para guardar el PDF

        // Guarda el archivo PDF utilizando la librería file-saver
        saveAs(blob, filename);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
