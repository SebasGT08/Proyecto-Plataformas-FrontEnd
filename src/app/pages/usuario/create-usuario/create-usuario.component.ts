// create-usuario.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/domain/persona.model';
import { Usuario } from 'src/app/domain/usuario.model';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent {
 personas: Persona[] = [];
  selectedPersonaId: number = 0;

  usuarios: Usuario = {
    persona_id: 0,
    cargo: '',
    usuario: '',
    contrasenia: '',
  };
  
  constructor(
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaService.getAll().subscribe(
      (personas: Persona[]) => {
        this.personas = personas.filter(persona => persona.tipo === 'E');
      },
      (error) => {
        console.error('Error al cargar la lista de personas', error);
      }
    );
  }
  onSubmit(registerForm: { valid: any }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }
  
    // Antes de guardar el usuario, asignamos el persona_id seleccionado al usuario
    this.usuarios.persona_id = this.selectedPersonaId;
  
    console.log('Datos del usuario antes de guardar:', this.usuarios); // Agregar esta línea
  
    this.usuarioService.save(this.usuarios).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); // Agregar esta línea
  
        if (response.codigo) {
          this._snackBar.open(`Error al crear usuario: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('Usuario creado con éxito', 'Cerrar', {
            duration: 2000,
          });
  
          this.usuarios = { persona_id: 0, cargo: '', usuario: '', contrasenia: '' };
  
          console.log('Datos del usuario después de guardar:', this.usuarios); // Agregar esta línea
        }
      },
      error => {
        console.log('Error al guardar usuario:', error); // Agregar esta línea
  
        this._snackBar.open(`Error al crear usuario: ${error}`, 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }
  
}
