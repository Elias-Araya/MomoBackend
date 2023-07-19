import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService  {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLogged = this.authSvc.isLogged();

    if (!isLogged) {
      this.router.navigate(['/dashboard']);
    }

    return isLogged;
  }
}
