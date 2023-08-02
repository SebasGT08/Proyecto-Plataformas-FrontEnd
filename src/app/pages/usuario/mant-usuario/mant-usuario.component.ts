import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/domain/usuario.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mant-usuario',
  templateUrl: './mant-usuario.component.html',
  styleUrls: ['./mant-usuario.component.scss']
})
export class MantUsuarioComponent implements OnInit {
  listadoUsuarios: Usuario[] | undefined;
  
  displayedColumns: string[] = ['usuario_id', 'usuario', 'contrasenia','cargo','acciones'];

  constructor(
    private _snackBar: MatSnackBar,private sharedService: DataSharingService,private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getAll().subscribe(
      (response: Usuario[]) => {
        this.listadoUsuarios = response;
        console.log('Listado de usuarios:', this.listadoUsuarios);
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  eliminar(usuario: Usuario) {
    this.usuarioService.eliminar(usuario).subscribe(
      (response) => {
        this._snackBar.open(` ${response.mensaje}`, 'Cerrar', {
          duration: 5000,
        });
        this.getUsuarios(); // refrescar la lista después de la eliminación
      },
      (error) => {
        this._snackBar.open(` ${error.error.mensaje}`, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  editar(usuario: Usuario) {
    this.sharedService.changeUsuario(usuario);
    this.router.navigate(['edit-usuario']);
  }
}
