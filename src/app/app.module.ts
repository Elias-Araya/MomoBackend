import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntranetComponent } from './intranet/intranet.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PerfilUsuarioComponent } from './components/private/perfil-usuario/perfil-usuario.component';
import { ListarReservasComponent } from './components/private/listar-reservas/listar-reservas.component';
import { AgregarReservaComponent } from './modals/agregar-reserva/agregar-reserva.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ListarPedidosComponent } from './components/private/listar-pedidos/listar-pedidos.component';

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
    PerfilUsuarioComponent,
    ListarReservasComponent,
    AgregarReservaComponent,
    ListarPedidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule, // Asegúrate de que BrowserAnimationsModule esté importado antes que ToastrModule
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
    FormsModule,
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
