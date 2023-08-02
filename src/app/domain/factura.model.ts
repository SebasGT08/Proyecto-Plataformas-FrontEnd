import { Persona } from './persona.model';
import { Ticket } from 'src/app/domain/ticket.model';
export interface Factura {
  facturaid?: number;
  fecha?: string;
  iva?: number;
  subtotal?: number;
  total?: number;
  persona?: Persona;
  ticket?: Ticket;
}
