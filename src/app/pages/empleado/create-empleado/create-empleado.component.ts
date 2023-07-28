import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/domain/persona.model';


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
