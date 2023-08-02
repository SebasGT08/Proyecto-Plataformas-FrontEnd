
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes del Usuario
import { CreateUsuarioComponent } from './pages/usuario/create-usuario/create-usuario.component';
import { MantUsuarioComponent } from './pages/usuario/mant-usuario/mant-usuario.component';

//Componentes del Usuario
import { CreateEmpleadoComponent } from './pages/empleado/create-empleado/create-empleado.component';
import { MantEmpleadoComponent } from './pages/empleado/mant-empleado/mant-empleado.component';

//Componentes Login
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service'; //Servicio para verficar que este iniciado sesion

//Componentes del Cliente
import { CreateClienteComponent } from './pages/cliente/create-cliente/create-cliente.component';
import { MantClienteComponent } from './pages/cliente/mant-cliente/mant-cliente.component';


//Componentes de la Factura
import { CreateFacturaComponent } from './pages/factura/create-factura/create-factura.component';
import { MantFacturaComponent } from './pages/factura/mant-factura/mant-factura.component';

//Componentes del Ticket
import { CreateTicketComponent } from './pages/ticket/create-ticket/create-ticket.component';
import { MantTicketComponent } from './pages/ticket/mant-ticket/mant-ticket.component';

//Componentes Home
import { HomeComponent } from './pages/home/home.component';
import { EditEmpleadoComponent } from './pages/empleado/edit-empleado/edit-empleado.component';
import { EditClienteComponent } from './pages/cliente/edit-cliente/edit-cliente.component';
import { EditUsuarioComponent } from './pages/usuario/edit-usuario/edit-usuario.component';
import { CreateLugarComponent } from './pages/lugar/create-lugar/create-lugar.component';
import { MantLugarComponent } from './pages/lugar/mant-lugar/mant-lugar.component';
import { EditLugarComponent } from './pages/lugar/edit-lugar/edit-lugar.component';

const routes: Routes = [
  //Login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //Usuario
  {path: 'create-usuario',component: CreateUsuarioComponent,canActivate: [AuthGuardService]},
  {path: 'mant-usuario',component: MantUsuarioComponent,canActivate: [AuthGuardService]},
  {path: 'edit-usuario',component: EditUsuarioComponent,canActivate: [AuthGuardService]},
  //Empleado
  {path: 'create-empleado',component: CreateEmpleadoComponent,canActivate: [AuthGuardService]},
  {path: 'mant-empleado',component: MantEmpleadoComponent,canActivate: [AuthGuardService]},
  {path: 'edit-empleado',component: EditEmpleadoComponent,canActivate: [AuthGuardService]},
  //Cliente
  {path: 'create-cliente',component: CreateClienteComponent,canActivate: [AuthGuardService]},
  {path: 'mant-cliente',component: MantClienteComponent,canActivate: [AuthGuardService]},
  {path: 'edit-cliente',component: EditClienteComponent,canActivate: [AuthGuardService]},

  //lugar
  {path: 'create-lugar',component: CreateLugarComponent,canActivate: [AuthGuardService]},
  {path: 'mant-lugar',component: MantLugarComponent,canActivate: [AuthGuardService]},
  {path: 'edit-lugar',component: EditLugarComponent,canActivate: [AuthGuardService]},


  //Factura
  {path: 'create-factura',component: CreateFacturaComponent,canActivate: [AuthGuardService]},
  {path: 'mant-factura',component: MantFacturaComponent,canActivate: [AuthGuardService]},
  //Ticket
  {path: 'create-ticket',component: CreateTicketComponent,canActivate: [AuthGuardService]},
  {path: 'mant-ticket',component: MantTicketComponent,canActivate: [AuthGuardService]},
  //Home
  {path: 'home',component: HomeComponent,canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
