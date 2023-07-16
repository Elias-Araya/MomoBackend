import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/auth-service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent implements OnInit {
  userDetails: User | null = null;
  constructor(private authSvc: AuthService) {
    this.authSvc.getCurrentUser().subscribe((user) => {
      this.userDetails = user;
    });
  }

  ngOnInit(): void {
    document.body.classList.add('body-styling');
    console.log('ASD');
  }
}
