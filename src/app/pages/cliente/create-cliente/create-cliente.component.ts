import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Persona } from 'src/app/domain/persona.model';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.scss']
})
export class CreateClienteComponent implements OnInit {
  persona: Persona = {
    cedula: '',
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    tipo: 'C'
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
          this._snackBar.open(`Error al crear cliente: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('Cliente creado con éxito', 'Cerrar', {
            duration: 2000,
          });
          this.persona = { cedula: '',nombre: '',telefono: '',direccion: '',correo: '',tipo: 'C' };
          //this.router.navigate(['list-persona']);
        }
      },
      error => {
        this._snackBar.open(`Error al crear cliente: ${error}`, 'Cerrar', {
          duration: 2000,
        });
      }
    );

  }
}
