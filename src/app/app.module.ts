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
import { CreateClienteComponent } from './pages/cliente/create-cliente/create-cliente.component';
import { MantClienteComponent } from './pages/cliente/mant-cliente/mant-cliente.component';
import { MantFacturaComponent } from './pages/factura/mant-factura/mant-factura.component';
import { CreateFacturaComponent } from './pages/factura/create-factura/create-factura.component';
import { CreateTicketComponent } from './pages/ticket/create-ticket/create-ticket.component';
import { MantTicketComponent } from './pages/ticket/mant-ticket/mant-ticket.component';
import { HomeComponent } from './pages/home/home.component';
import { CabeceraComponent } from './cabecera/cabecera.component';

//Crear

import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Mantenimiento
import { MatTableModule } from '@angular/material/table';
import { EditEmpleadoComponent } from './pages/empleado/edit-empleado/edit-empleado.component';
import { InfoEmpresaComponent } from './info/info-empresa/info-empresa.component';
import { InfoTarifaComponent } from './info/info-tarifa/info-tarifa.component';
import { InfoLugarComponent } from './info/info-lugar/info-lugar.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,

    MenuComponent,
     CreateEmpleadoComponent,
     CreateUsuarioComponent,
     MantEmpleadoComponent,
     MantUsuarioComponent,
     LoginComponent,
     CreateClienteComponent,
     MantClienteComponent,
     MantFacturaComponent,
     CreateFacturaComponent,
     CreateTicketComponent,
     MantTicketComponent,
     HomeComponent,
     CabeceraComponent,
     EditEmpleadoComponent,
     InfoEmpresaComponent,
     InfoTarifaComponent,
     InfoLugarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,MatMenuModule,MatButtonModule,
    MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule,HttpClientModule, MatSnackBarModule,
    ReactiveFormsModule,
    MatTableModule,FlexLayoutModule,MatAutocompleteModule,MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
