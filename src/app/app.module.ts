import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';

//Imports Para el Menu de navegacion
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

//Paginas
import { CreateEmpleadoComponent } from './pages/empleado/create-empleado/create-empleado.component';
import { CreateUsuarioComponent } from './pages/usuario/create-usuario/create-usuario.component';
import { MantEmpleadoComponent } from './pages/empleado/mant-empleado/mant-empleado.component';
import { MantUsuarioComponent } from './pages/usuario/mant-usuario/mant-usuario.component';
import { LoginComponent } from './login/login.component';

//Login
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,

    MenuComponent,
     CreateEmpleadoComponent,
     CreateUsuarioComponent,
     MantEmpleadoComponent,
     MantUsuarioComponent,
     LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatMenuModule,MatButtonModule,
    MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
