
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../domain/persona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) { }
  save(persona: Persona){
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Personas/registrar", persona)
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Personas/all")
  }

  eliminar(persona: Persona){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Personas/eliminar", { body: persona });
  }

  actualizar(persona: Persona){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Personas/actualizar", persona);
  }

}
