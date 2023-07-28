import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes del Usuario
import { CreateUsuarioComponent } from './pages/usuario/create-usuario/create-usuario.component';
import { MantUsuarioComponent } from './pages/usuario/mant-usuario/mant-usuario.component';
import { CreateEmpleadoComponent } from './pages/empleado/create-empleado/create-empleado.component';
import { MantEmpleadoComponent } from './pages/empleado/mant-empleado/mant-empleado.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  //Login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  //Usuario
  {path: 'create-usuario',component: CreateUsuarioComponent,canActivate: [AuthGuardService]},
  {path: 'mant-usuario',component: MantUsuarioComponent,canActivate: [AuthGuardService]},
  //Empleado
  {path: 'create-empleado',component: CreateEmpleadoComponent,canActivate: [AuthGuardService]},
  {path: 'mant-empleado',component: MantEmpleadoComponent,canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
