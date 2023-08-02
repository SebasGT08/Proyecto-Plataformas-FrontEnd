import { LugarService } from 'src/app/services/lugar.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Lugar } from 'src/app/domain/lugar.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-mant-lugar',
  templateUrl: './mant-lugar.component.html',
  styleUrls: ['./mant-lugar.component.scss']
})
export class MantLugarComponent implements OnInit {
  listadolugar: Lugar[] | undefined;

  displayedColumns: string[] = ['lugar_id', 'tipoVehiculo','piso', 'numeroLugar', 'estado', 'acciones'];

  constructor(
    private _snackBar: MatSnackBar,private sharedService: DataSharingService,private router: Router,
    private LugarService: LugarService
  ) {}

  ngOnInit(): void {
    this.getLugar();
  }

  getLugar(): void {
    this.LugarService.getAll().subscribe(
      (response: Lugar[]) => {
        this.listadolugar = response;
        console.log('Listado de lugares:', this.listadolugar);
      },
      (error) => {
        console.error('Error al obtener la lista de lugares:', error);
      }
    );
  }

  eliminar(lugar: Lugar) {
    this.LugarService.eliminar(lugar).subscribe(
      (response) => {
        this._snackBar.open(` ${response.mensaje}`, 'Cerrar', {
          duration: 5000,
        });
        this.getLugar(); // refrescar la lista después de la eliminación
      },
      (error) => {
        this._snackBar.open(` ${error.error.mensaje}`, 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  editar(lugar: Lugar) {
    this.sharedService.changeLugar(lugar);
    this.router.navigate(['edit-lugar']);
  }
}

