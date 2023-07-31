import { TarifaService } from './../../services/tarifa.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tarifa } from 'src/app/domain/tarifa.model';


@Component({
  selector: 'app-info-tarifa',
  templateUrl: './info-tarifa.component.html',
  styleUrls: ['./info-tarifa.component.scss']
})
export class InfoTarifaComponent implements OnInit {

  listadoTarifasWS: any;
  displayedColumns: string[] = ['tipo', 'precio', 'acciones'];

  constructor(private _snackBar: MatSnackBar, private tarifaService: TarifaService) { }
  ngOnInit(): void {
    this.getTarifas();
  }



  getTarifas(): void {
    this.tarifaService.getAll().subscribe(
      (response) => {
        this.listadoTarifasWS = response.sort((a: { tarifaId: number; }, b: { tarifaId: number; }) => a.tarifaId - b.tarifaId);
        console.log('Listado de tarifas:', this.listadoTarifasWS);
      },
      (error) => {
        console.error('Error al obtener la lista de tarifas:', error);
      }
    );
  }

  edicionIndex = -1;
  precioEdicion = 0;

  iniciarEdicion(i: number) {
    this.edicionIndex = i;
    this.precioEdicion = this.listadoTarifasWS[i].costoTarifa!;
  }
  guardarEdicion(i: number) {
    if (this.edicionIndex !== -1 && this.precioEdicion !== this.listadoTarifasWS[i].costoTarifa) {
      const tarifaActualizada: Tarifa = {
        tarifaId: this.listadoTarifasWS[i].tarifaId,
        costoTarifa: this.precioEdicion,
        tipoVehiculo: this.listadoTarifasWS[i].tipoVehiculo
      };

      this.tarifaService.actualizar(tarifaActualizada).subscribe(
        response => {
          if (response.codigo) { // si response.codigo existe, hay un error
            this._snackBar.open(`Error al actualizar tarifa: ${response.mensaje}`, 'Cerrar', {
              duration: 2000,
            });
          } else {
            this._snackBar.open('Tarifa actualizada con éxito', 'Cerrar', {
              duration: 2000,
            });

            this.getTarifas();
          }
        },
        error => {
          this._snackBar.open(`Error al actualizar empleado: ${error}`, 'Cerrar', {
            duration: 2000,
          });
        }
      );
      this.getTarifas();

    }
    this.getTarifas();

    this.edicionIndex = -1;
  }

  cancelarEdicion() {
    this.edicionIndex = -1;
  }
}
