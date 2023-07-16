import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashhomeComponent } from './component/dashboard/dashhome/dashhome.component';
import { AuthguardService } from './Core/authguard.service';
import { PerfilUsuarioComponent } from './components/private/perfil-usuario/perfil-usuario.component';
import { ListarReservasComponent } from './components/private/listar-reservas/listar-reservas.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashhomeComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'intranet',
    component: PerfilUsuarioComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'listaReservas',
    component: ListarReservasComponent,
    canActivate: [AuthguardService],
  },
  /*  {
    path: 'listaPedidos',
    component: PerfilUsuarioComponent,
    canActivate: [AuthguardService],
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
