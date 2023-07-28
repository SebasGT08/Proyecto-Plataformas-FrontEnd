import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizarService } from '../services/autorizar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true; // Para el botón de ocultar/mostrar contraseña
  model: any = {};

  constructor(
    private router: Router,
    private authenticationService: AutorizarService
  ) {
    // redirige a la página de inicio si ya está conectado
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['home']);
        },
        error => {
          // Aquí se manejará el error.
          console.error('Error de inicio de sesión:', error);
        }
      );
  }


}
