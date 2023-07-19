import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../model/pedido';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface PedidoResponse {
  data: Pedido[];
}
@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private url = environment.api;
  constructor(private http: HttpClient) {}

  postPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.url}/pedido`, pedido);
  }

  getProducts(id: any): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.url}/listPedido/${id}`);
  }

  obtenerFactura(id: any): Observable<Blob> {
    console.log('ID facturaobtener ', id);
    const headers = { 'Content-Type': 'application/pdf' };
    return this.http.get(`${this.url}/listFactura/${id}`, {
      responseType: 'blob',
      headers,
    });
  }
}
