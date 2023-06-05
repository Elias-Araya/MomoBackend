import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<{
        data: {
          token: string;
          user: {
            id_usuario: number;
            nombre_usuario: string;
            email: string;
            direccion: string;
          };
        };
      }>(`${environment.api}/login`, { email, password })
      .pipe(
        tap((data) => {
          console.log('DATA 1', data.data.token);
          console.log('DATA 2', data.data.user.id_usuario);
          console.log('DATA 3', data.data.user.nombre_usuario);
          console.log('DATA 4', data.data.user.email);
          console.log('DATA 5', data.data.user.direccion);
          localStorage.setItem('token', data.data.token);
        })
      );
  }
}
