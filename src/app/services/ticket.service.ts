import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../domain/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }
  save(ticket: Ticket){
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tickets/registrar", ticket)
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tickets/listarTickets")
  }

  eliminar(ticket: Ticket){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tickets/eliminar", { body: ticket });
  }

  actualizar(ticket: Ticket){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tickets/actualizar", ticket);
  }

}
