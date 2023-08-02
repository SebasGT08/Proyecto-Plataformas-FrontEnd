import { Component, OnInit,Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Persona } from 'src/app/domain/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent implements OnInit {

  @Input() persona: Persona = { personaid: 0,cedula: '',
  nombre: '',telefono: '',direccion: '',correo: '',tipo: 'E'};

  constructor(
    private _snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    private router: Router
    , private personaService: PersonaService
  ) { }

  ngOnInit() {
    this.dataSharingService.currentPersona.subscribe(persona => {
      if(persona){
        this.persona = persona;
      }
    });
  }

  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    this.personaService.actualizar(this.persona).subscribe(
      response => {
        if (response.codigo) { // si response.codigo existe, hay un error
          this._snackBar.open(`Error al actualizar empleado: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('Empleado actualizado con éxito', 'Cerrar', {
            duration: 2000,
          });
          this.persona = { cedula: '',nombre: '',telefono: '',direccion: '',correo: '',tipo: 'E' };
          this.router.navigate(['mant-empleado']);
        }
      },
      error => {
        this._snackBar.open(`Error al actualizar empleado: ${error}`, 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }
}
