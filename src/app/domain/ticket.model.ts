import { Lugar } from "./lugar.model";
import { Tarifa } from "./tarifa.model";
import { Usuario } from "./usuario.model";
import { Vehiculo } from "./vehiculo.model";

export interface Ticket {
  ticketid?: number;
  fecha?: string;
  hora_entrada?: string;
  hora_salida?: string;
  usuario?: Usuario;
  tarifa?: Tarifa;
  lugar?: Lugar;
  vehiculo?: Vehiculo;
}
