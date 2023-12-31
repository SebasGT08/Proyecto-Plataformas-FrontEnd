import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Persona } from 'src/app/domain/persona.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-mant-cliente',
  templateUrl: './mant-cliente.component.html',
  styleUrls: ['./mant-cliente.component.scss']
})
export class MantClienteComponent implements OnInit{
  listadoPersonas: Persona[] | undefined;
   listadoPersonasWS: any;

  displayedColumns: string[] = ['id','cedula', 'nombre', 'telefono', 'direccion','correo','acciones'];


  constructor(private _snackBar: MatSnackBar,private sharedService: DataSharingService,private router: Router, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getAll().subscribe(
      (response) => {
        // Filtrar las personas por tipo "C" (clientes)
        this.listadoPersonasWS = response.filter((persona: Persona) => persona.tipo === 'C');
        console.log('Listado de personas (Clientes):', this.listadoPersonasWS);
      },
      (error) => {
        console.error('Error al obtener la lista de personas:', error);
      }
    );
  }
  


  eliminar(persona: Persona) {
    this.personaService.eliminar(persona).subscribe(
      response => {

          this._snackBar.open(` ${response.mensaje}`, 'Cerrar', {
            duration: 5000,
          });
          this.getPersonas();  // refrescar la lista después de la eliminación


      },
      error => {
        this._snackBar.open(` ${error.error.mensaje}`, 'Cerrar', {
          duration: 5000,
        });
      }
    )
  }

  editar(persona: Persona) {

    this.sharedService.changePersona(persona);
    this.router.navigate(['edit-cliente']);
  }
}

