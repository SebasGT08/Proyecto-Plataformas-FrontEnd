import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/domain/ticket.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { TicketService } from './../../../services/ticket.service';

@Component({
  selector: 'app-mant-ticket',
  templateUrl: './mant-ticket.component.html',
  styleUrls: ['./mant-ticket.component.scss']
})
export class MantTicketComponent implements OnInit {
  listadoTicket: Ticket[] | undefined;
  listadoTicketsWS: any;
  listadoTicketsOriginal: any;
  fechaFiltro: Date | null = null;

  displayedColumns: string[] = ['ticketid', 'estado', 'fecha', 'hora_entrada', 'hora_salida'
  , 'usuario', 'tarifa', 'lugar', 'vehiculo'];

  constructor(
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketService.getAll().subscribe(
      (response: Ticket[]) => {
        this.listadoTicketsWS = response;
        this.listadoTicketsOriginal = [...response];
      },
      (error) => {
        console.error('Error al obtener la lista de tickets:', error);
      }
    );
  }

  aplicarFiltro(): void {
    if(this.fechaFiltro) {
      const fechaSeleccionada = this.fechaFiltro.toLocaleDateString('fr-CA', { timeZone: 'UTC' });
      this.listadoTicketsWS = this.listadoTicketsOriginal.filter((factura: any) => factura.fecha.startsWith(fechaSeleccionada));
    } else {
      this.listadoTicketsWS = [...this.listadoTicketsOriginal];
    }
  }
}
