import { Factura } from './../../../domain/factura.model';
import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura.service';

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

 displayedColumns: string[] = ['id','fecha','cedula', 'nombre', 'ticket', 'placa','tipoVehiculo','subtotal','total'];


 constructor( private facturaService: FacturaService) { }

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





}
