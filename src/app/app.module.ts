import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntranetComponent } from './intranet/intranet.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Core/auth-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MenuComponent } from './component/menu/menu.component';
import { JwtInterceptor } from './Core/jwt.interceptor';
import { FilterPPipe } from './shared/filter-p.pipe';
import { CartComponent } from './component/cart/cart.component';
import { DatePipe } from '@angular/common';
import { ReservaComponent } from './component/reserva/reserva.component';
import { DashhomeComponent } from './component/dashboard/dashhome/dashhome.component';
import { DashnavbarComponent } from './component/dashboard/dashnavbar/dashnavbar.component';

@NgModule({
  declarations: [
    AppComponent,
    IntranetComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MenuComponent,
    FilterPPipe,
    CartComponent,
    ReservaComponent,
    DashhomeComponent,
    DashnavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
