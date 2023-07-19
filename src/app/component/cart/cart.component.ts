import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Pedido } from 'src/app/model/pedido';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  myCart$ = this.productSvc.mycart$;
  userId: number = JSON.parse(localStorage.getItem('user') || '{}').id_usuario;

  constructor(
    private productSvc: ProductService,
    private datePipe: DatePipe,
    private pedidoSvc: PedidoService,
    private router : Router
  ) {}

  ngOnInit(): void {}

  totalProduct(price: number, units: number) {
    return price * units;
  }

  deleteProduct(id: number) {
    this.productSvc.deleteProduct(id);
  }

  updateUnits(operation: string, id: number) {
    const product = this.productSvc.findProductById(id);
    if (product) {
      if (operation === 'minus' && product.stock > 0) {
        product.stock = product.stock - 1;
      }
      if (operation === 'add') {
        product.stock = product.stock + 1;
      }
      if (product.stock === 0) {
        this.deleteProduct(id);
      } else {
        this.productSvc.updateProductInCart(product);
      }
    }
  }

  totalCart() {
    const result = this.productSvc.totalCart();
    return result;
  }

  crearPedido(): void {
    /* Swal.fire({
      icon: 'success',
      title: 'LogIn exitoso',
      showConfirmButton: false,
      timer: 1500,
    }); */
    this.myCart$.pipe(take(1)).subscribe((cart) => {
      console.log('CART ', cart);
      const pedido: Pedido = {
        id_usuario: parseInt(
          JSON.parse(localStorage.getItem('user') || '{}').id_usuario || '0'
        ),
        fecha: this.datePipe.transform(
          new Date().toISOString(),
          'dd/MM/yyyy HH:mm'
        )!, // Esto crea una cadena de fecha/tiempo en el formato ISO
        productos: cart.map((product) => ({
          sku: product.id_producto,
          cantidad: product.stock,
        })),
      };

      console.log('PEDIDO ', pedido);

      this.pedidoSvc.postPedido(pedido).subscribe({
        next: (resp: any) => {
          console.log('Pedido creado correctamente ', resp);

          alert(resp.data.mensaje);
          this.productSvc.clearCart();
          this.router.navigate(['/listaPedidos']);
        },
        error: (err: any) => {
          console.log(err);
          alert(err);
        },
      });
    });
  }
}
