import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { ListarReservasComponent } from './private/listar-reservas/listar-reservas.component';
import { ListarPedidosComponent } from './private/listar-pedidos/listar-pedidos.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [{ path: '', redirectTo: 'home', pathMatch: 'full' }],
  },
  {
    path: 'perfilEmpresa',
    loadChildren: () =>
      import('./private/perfil-empresa/perfil-empresa.module').then(
        (m) => m.PerfilEmpresaModule
      ),
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
