import { Component } from '@angular/core';
import { AutorizarService } from '../services/autorizar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  // Variables booleanas para controlar la visibilidad de los menús
  isAdmin: boolean = false;
  isGeneral: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AutorizarService
  ) {
     // Obtener el usuario del Local Storage
     const user = JSON.parse(localStorage.getItem('currentUser')!);

     // Verificar el cargo del usuario y habilitar/deshabilitar menús según corresponda
     if (user && user.cargo === 'A') {
       this.isAdmin = true;
       this.isGeneral = true; // También se le habilitan los menús de gerente
     } else if (user && user.cargo === 'G') {
       this.isAdmin = false;
       this.isGeneral = true;
     }
   }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
