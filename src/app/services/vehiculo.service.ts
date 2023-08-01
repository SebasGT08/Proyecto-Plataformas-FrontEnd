
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Vehiculo } from '../domain/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {


  constructor(private http: HttpClient) { }
  save(vehiculo: Vehiculo){
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Vehiculos/registrar", vehiculo)
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Vehiculos/all")
  }

  eliminar(vehiculo: Vehiculo){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Vehiculos/eliminar", { body: vehiculo });
  }

  actualizar(vehiculo: Vehiculo){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Vehiculos/actualizar", vehiculo);
  }
}
