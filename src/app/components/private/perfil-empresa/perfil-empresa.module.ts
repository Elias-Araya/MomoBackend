import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfilEmpresaComponent } from './perfil-empresa.component';


const routes: Routes = [
  { path: '', component: PerfilEmpresaComponent }
];

@NgModule({
  declarations: [
    PerfilEmpresaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PerfilEmpresaModule { }
