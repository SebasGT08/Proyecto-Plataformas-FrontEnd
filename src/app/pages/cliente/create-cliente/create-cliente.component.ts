import { Component , OnInit} from '@angular/core';
import { Persona } from 'src/app/domain/persona.model';

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

  constructor() {

  }

  ngOnInit(): void {
  }

  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    console.log(this.persona);
  }
}
