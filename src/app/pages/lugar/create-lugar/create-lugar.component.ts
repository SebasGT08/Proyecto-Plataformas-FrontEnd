import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lugar } from 'src/app/domain/lugar.model';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-create-lugar',
  templateUrl: './create-lugar.component.html',
  styleUrls: ['./create-lugar.component.scss']
})
export class CreateLugarComponent implements OnInit {

  lugar: Lugar = {
    numeroLugar: 1,
    estado: 'A',
    piso: 1,
    tipoVehiculo: 'Moto'
  };

  numerosLugar: number[] = Array.from({ length: 20 }, (_, i) => i + 1); // Genera un arreglo de números del 1 al 20
  pisos: number[] = [1, 2, 3]; // Pisos del 1 al 3

  constructor(private router: Router, private _snackBar: MatSnackBar, private lugarService: LugarService) {}

  ngOnInit(): void {}

  onSubmit(registerForm: { valid: any }) {
    if (!registerForm.valid) {
      console.log('Formulario no válido');
      return;
    }

    this.lugarService.save(this.lugar).subscribe(
      response => {
        if (response.codigo) {
          this._snackBar.open(`Error al registrar lugar: ${response.mensaje}`, 'Cerrar', {
            duration: 2000,
          });
        } else {
          this._snackBar.open('Lugar registrado con éxito', 'Cerrar', {
            duration: 2000,
          });
          this.lugar = {
            numeroLugar: 1,
            estado: 'A',
            piso: 1,
            tipoVehiculo: 'Moto'
          };
        }
      },
      error => {
        this._snackBar.open(`Error al registrar lugar: ${error}`, 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }
}
