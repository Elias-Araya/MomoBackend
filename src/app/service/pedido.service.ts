import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private url = environment.api;
  constructor(private http: HttpClient) {}

  postPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.url}/pedido`, pedido);
  }
}
