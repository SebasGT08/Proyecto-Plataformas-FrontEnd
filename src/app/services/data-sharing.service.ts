import { Persona } from './../domain/persona.model';
// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private personaSource = new BehaviorSubject<Persona | null>(null);
  currentPersona = this.personaSource.asObservable();


  constructor() { }

  changePersona(persona: Persona) {
    this.personaSource.next(persona);
  }


}
