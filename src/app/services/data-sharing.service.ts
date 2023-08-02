import { Persona } from './../domain/persona.model';
// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../domain/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private personaSource = new BehaviorSubject<Persona | null>(null);
  private usuarioSource = new BehaviorSubject<Usuario | null>(null);
  currentPersona = this.personaSource.asObservable();
  currentUsuario = this.usuarioSource.asObservable();


  constructor() { }

  changePersona(persona: Persona) {
    this.personaSource.next(persona);
  }
  changeUsuario(usuario: Usuario) {
    this.usuarioSource.next(usuario);
  }


}
