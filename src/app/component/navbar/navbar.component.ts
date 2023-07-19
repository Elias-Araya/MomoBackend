import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth-service';
import { User } from 'src/app/model/user';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  viewCart: boolean = false;
  myCart$ = this.productSvc.mycart$;
  userLoggedIn = this.authSvc.isLogged();
  userDetails: User | null = null;

  constructor(
    private productSvc: ProductService,
    private authSvc: AuthService,
    private router: Router
  ) {
    this.authSvc.getCurrentUser().subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit(): void {}

  logOut(): void {
    this.authSvc.logOut();
  }

  onToggleCart() {
    this.viewCart = !this.viewCart;
  }

  reservas() {
    console.log('Router');
    this.router.navigate(['/listaReservas']);
  }
}
