import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AutorizarService } from './autorizar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AutorizarService,private router: Router) { }

  canActivate() {
    if (!this.auth.currentUserValue) {
      // si no está logueado, redirige a la página de login
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
