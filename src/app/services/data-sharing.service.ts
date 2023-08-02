import { Persona } from './../domain/persona.model';
// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../domain/usuario.model';
import { Lugar } from '../domain/lugar.model';
import { Factura } from '../domain/factura.model';



@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private personaSource = new BehaviorSubject<Persona | null>(null);
  private usuarioSource = new BehaviorSubject<Usuario | null>(null);
  private lugarSource = new BehaviorSubject<Lugar | null>(null);
  private facturaSource = new BehaviorSubject<Factura | null>(null);

  private numfacturaSource = new BehaviorSubject<number | null>(null);

  currentPersona = this.personaSource.asObservable();
  currentUsuario = this.usuarioSource.asObservable();
  currentLugar = this.lugarSource.asObservable();
  currentFactura = this.facturaSource.asObservable();
  currentnumFactura = this.numfacturaSource.asObservable();



  constructor() { }

  changePersona(persona: Persona) {
    this.personaSource.next(persona);
  }
  changeUsuario(usuario: Usuario) {
    this.usuarioSource.next(usuario);
  }
  changeLugar(lugar: Lugar) {
    this.lugarSource.next(lugar);
  }

  changeFactura(Factura: Factura) {
    this.facturaSource.next(Factura);
  }

  changeNumFactura(id: number) {
    this.numfacturaSource.next(id);
  }

}
