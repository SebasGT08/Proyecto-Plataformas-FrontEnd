
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Tarifa } from '../domain/tarifa.model';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(private http: HttpClient) { }
  save(tarifa: Tarifa){
    return this.http.post<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tarifas/registrar", tarifa)
  }

  getAll(){
    return this.http.get<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tarifas/listarTarifas")
  }

  eliminar(tarifa: Tarifa){
    return this.http.delete<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tarifas/eliminar", { body: tarifa });
  }

  actualizar(tarifa: Tarifa){
    return this.http.put<any>("http://localhost:8080/Proyecto-Plataformas/rs/Tarifas/actualizar", tarifa);
  }
}
