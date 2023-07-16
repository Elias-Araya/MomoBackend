import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservaGeneral } from '../model/reserva-general';
import { Reserva } from '../model/reserva';

export interface ReservaResponse {
  data: Reserva[];
}
@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private url = environment.api;
  constructor(private http: HttpClient) {}

  postReservaG(reservag: ReservaGeneral): Observable<ReservaGeneral> {
    return this.http.post<ReservaGeneral>(
      `${this.url}/crearReservaGeneral`,
      reservag
    );
  }
  postReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(`${this.url}/crearReserva`, reserva);
  }

  getReservas(id: any): Observable<ReservaResponse> {
    return this.http.get<ReservaResponse>(
      `${this.url}/listReservaByIdAll/${id}`
    );
  }
}
