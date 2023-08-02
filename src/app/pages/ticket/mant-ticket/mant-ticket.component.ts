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
  filteredListadoTicket: Ticket[] | undefined; // Lista filtrada para almacenar los tickets filtrados

  displayedColumns: string[] = ['ticketid', 'estado', 'fecha','hora_entrada','hora_salida','usuario',
  'tarifa','lugar','vehiculo'];

  constructor(
    private _snackBar: MatSnackBar,
    private sharedService: DataSharingService,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketService.getAll().subscribe(
      (response: Ticket[]) => {
        this.listadoTicket = response;
        this.filteredListadoTicket = response; // Inicialmente, ambas listas son iguales
        console.log('Listado de tickets:', this.listadoTicket);
      },
      (error) => {
        console.error('Error al obtener la lista de tickets:', error);
      }
    );
  }

  onDateChange(event: any): void {
    // Extraer la fecha del evento
    const selectedDate: Date = event.value;
  
    // Filtrar los tickets por fecha
    if (this.listadoTicket) {
      this.listadoTicket = this.listadoTicket.filter(ticket => {
        // La propiedad 'fecha' podría ser undefined, así que verificamos antes de comparar
        if (ticket.fecha) {
          // Convertimos la fecha del ticket a un objeto Date para poder comparar
          const ticketDate: Date = new Date(ticket.fecha);
  
          // Comparamos las fechas sin tener en cuenta las horas, minutos, segundos y milisegundos
          return (
            ticketDate.getFullYear() === selectedDate.getFullYear() &&
            ticketDate.getMonth() === selectedDate.getMonth() &&
            ticketDate.getDate() === selectedDate.getDate()
          );
        }
        return false;
      });
    }
  }
  
  
  
  
  
  
}
