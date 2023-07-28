import { Component } from '@angular/core';
import { AutorizarService } from '../services/autorizar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(
    private router: Router,
    private authenticationService: AutorizarService
  ) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
