import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private currUser = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currUser.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<{ data: { token: string; user: User } }>(
        `${environment.api}/login`,
        {
          email,
          password,
        }
      )
      .pipe(
        map((res) => {
          const user = res.data.user;
          this.currUser.next(user);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(user));

          return user;
        })
      );
  }

  isLogged(): Observable<boolean> {
    return this.currUser
      .asObservable()
      .pipe(map((user: User | null) => !!user));
  }

  logOut() {
    localStorage.clear();
    return this.currUser.next(null);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currUser.asObservable();
  }
}
