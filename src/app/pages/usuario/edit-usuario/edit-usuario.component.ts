import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Persona } from 'src/app/domain/persona.model';
import { Usuario } from 'src/app/domain/usuario.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {
  @Input() usuarioN: Usuario = { id:0,cargo: '', usuario: '', contrasenia: '' };

  constructor(
    private _snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.dataSharingService.currentUsuario.subscribe(usuario => {
      if (usuario) {
        this.usuarioN = usuario;
      }
    });

  }

  onSubmit(registerForm: { valid: any }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }


    this.usuarioService.actualizar(this.usuarioN).subscribe(
      response => {
        if (response.codigo) {
          this._snackBar.open(`Error al actualizar usuario: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
            duration: 2000,
          });
          this.usuarioN = {  cargo: '', usuario: '', contrasenia: '' };
          this.router.navigate(['mant-usuario']);
        }
      },
      error => {
        this._snackBar.open(`Error al actualizar usuario: ${error}`, 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }


}
