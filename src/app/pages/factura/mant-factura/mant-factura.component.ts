import { Factura } from './../../../domain/factura.model';
import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';
import { Persona } from '../../../domain/persona.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mant-factura',
  templateUrl: './mant-factura.component.html',
  styleUrls: ['./mant-factura.component.scss']
})
export class MantFacturaComponent implements OnInit{
  listadoFacturas: Factura[] | undefined;
  listadoFacturasWS: any;
  listadoFacturasOriginal: any;
  fechaFiltro: Date | null = null;

 displayedColumns: string[] = ['id','fecha','cedula', 'nombre', 'ticket', 'placa','tipoVehiculo','subtotal','total','acciones'];


 constructor(
  private facturaService: FacturaService,
  private sharedService: DataSharingService,
  private router: Router
  ) { }

 ngOnInit(): void {
   this.getPersonas();
 }

 getPersonas(): void {
  this.facturaService.getAll().subscribe(
    (response) => {
      this.listadoFacturasWS = response;
      this.listadoFacturasOriginal = [...response];
    },
    (error) => {
      console.error('Error al obtener la lista de Facturas:', error);
    }
  );
}

aplicarFiltro(): void {
  if(this.fechaFiltro) {
    const fechaSeleccionada = this.fechaFiltro.toLocaleDateString('fr-CA', { timeZone: 'UTC' });
    this.listadoFacturasWS = this.listadoFacturasOriginal.filter((factura: any) => factura.fecha.startsWith(fechaSeleccionada));
  } else {
    this.listadoFacturasWS = [...this.listadoFacturasOriginal];
  }
}

imprimir(factura: Factura){


  this.sharedService.changeFactura(factura);
  this.sharedService.changeNumFactura(factura.facturaid!);
  this.router.navigate(['pdf-factura']);

}



}
