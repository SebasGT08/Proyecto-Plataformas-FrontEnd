import { LugarService } from 'src/app/services/lugar.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lugar } from 'src/app/domain/lugar.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-edit-lugar',
  templateUrl: './edit-lugar.component.html',
  styleUrls: ['./edit-lugar.component.scss']
})
export class EditLugarComponent implements OnInit {
  numerosLugar: number[] = Array.from({ length: 20 }, (_, i) => i + 1); 
  pisos: number[] = [1, 2, 3]; 
  @Input() lugar: Lugar = {
    numeroLugar: 0,
    estado: '',
    piso: 1,
    tipoVehiculo: '' };

  constructor(
    private _snackBar: MatSnackBar,
    private dataSharingService: DataSharingService,
    private router: Router,
    private LugarService: LugarService
  ) { }

  ngOnInit() {
    this.dataSharingService.currentLugar.subscribe(lugar => {
      if(lugar){
        this.lugar = lugar;
      }
    });
  }

  onSubmit(registerForm: { valid: any; }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    this.LugarService.actualizar(this.lugar).subscribe(
      response => {
        if (response.codigo) { // si response.codigo existe, hay un error
          this._snackBar.open(`Error al actualizar lugar: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('lugar actualizado con éxito', 'Cerrar', {
            duration: 2000,
          });
          this.lugar = { numeroLugar: 0,estado: '',piso: 0,tipoVehiculo: '' };
          this.router.navigate(['mant-lugar']);
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

