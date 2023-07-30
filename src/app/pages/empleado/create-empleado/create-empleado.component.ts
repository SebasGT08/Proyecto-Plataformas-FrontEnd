import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Persona } from 'src/app/domain/persona.model';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.scss']
})
export class CreateEmpleadoComponent implements OnInit{

  persona: Persona = {
    cedula: '',
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    tipo: 'E'
  };

  constructor(private router: Router,private _snackBar: MatSnackBar,private personaService: PersonaService) {

  }

  ngOnInit(): void {
  }

  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    this.personaService.save(this.persona).subscribe(
      response => {
        if (response.codigo) { // si response.codigo existe, hay un error
          this._snackBar.open(`Error al crear empleado: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('Empleado creado con éxito', 'Cerrar', {
            duration: 2000,
          });
          this.persona = { cedula: '',nombre: '',telefono: '',direccion: '',correo: '',tipo: 'E' };
          //this.router.navigate(['list-persona']);
        }
      },
      error => {
        this._snackBar.open(`Error al crear empleado: ${error}`, 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
