import { Persona } from './persona.model';
export interface Usuario {
  id?: number;
  persona?: Persona;
  cargo?: string;
  usuario?: string;
  contrasenia?: string;
}
