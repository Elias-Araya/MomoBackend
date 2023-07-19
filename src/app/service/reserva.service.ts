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

  /*  guardarVariableProc(data: any): Observable<any[]> {
    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify(data);
    return this.http.post<any>(`${environment.APIS.SERVICIOS}/variables/guardarVarProc`, body, {
      headers,
    });
  } */
  postReserva(data: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log('DATA DL SERVICE ', data);
    const body = JSON.stringify(data);
    return this.http.post<any>(`${this.url}/crearReserva`, body, {
      headers,
    });
  }

  patchReserva(data: any, id: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    console.log('DATA DL SERVICE ', data);
    const body = JSON.stringify(data);
    return this.http.patch<any>(`${this.url}/patchReserva/${id}`, body, {
      headers,
    });
  }

  delReserva(id: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.patch<any>(`${this.url}/cancelarReserva/${id}`, {
      headers,
    });
  }

  getReservas(id: any): Observable<ReservaResponse> {
    return this.http.get<ReservaResponse>(
      `${this.url}/listReservaByIdAll/${id}`
    );
  }
}
